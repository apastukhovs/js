// Calendar data
const _daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const _weekdayLabels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const _monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const _today = new Date();
const _todayComps = {
  year: _today.getFullYear(),
  month: _today.getMonth() + 1,
  day: _today.getDate(),
};


const calendar = Vue.component('calendar', {
  template: '#calendar',
  data() {
    return {
      month: _todayComps.month,
      year: _todayComps.year,
    };
  },
  props: {
  	dayKey: { type: String, default: 'label' },
  },
  computed: {

    monthIndex() {
      return this.month - 1;
    },
    isLeapYear() {
			return (this.year % 4 === 0 && this.year % 100 !== 0) || this.year % 400 === 0;
    },

    previousMonthComps() {
    	if (this.month === 1) return {
      	days: _daysInMonths[11],
      	month: 12,
        year: this.year - 1,
      }
      return {
      	days: (this.month === 3 && this.isLeapYear) ? 29 : _daysInMonths[this.month - 2],
      	month: this.month - 1,
        year: this.year,
      };
    },

    nextMonthComps() {
    	if (this.month === 12) return {
      	days: _daysInMonths[0],
      	month: 1,
        year: this.year + 1,
      };
      return {
      	days: (this.month === 2 && this.isLeapYear) ? 29 : _daysInMonths[this.month],
      	month: this.month + 1,
        year: this.year,
      };
    },

    months() {
      return _monthLabels.map((ml, i) => ({
        label: ml,
        label_1: ml.substring(0, 1),
        label_2: ml.substring(0, 2),
        label_3: ml.substring(0, 3),
        number: i + 1,
      }));
    },

    weekdays() {
      return _weekdayLabels.map((wl, i) => ({
        label: wl,
        label_1: wl.substring(0, 1),
        label_2: wl.substring(0, 2),
        label_3: wl.substring(0, 3),
        number: i + 1,
      }));
    },

    header() {
      const month = this.months[this.monthIndex];
      return {
        month: month,
        year: this.year.toString(),
        shortYear: this.year.toString().substring(2, 4),
        label: month.label + ' ' + this.year,
      };
    },

    firstWeekdayInMonth() {
      return new Date(this.year, this.monthIndex, 1).getDay() + 1;
    },

    daysInMonth() {
      if (this.month === 2 && this.isLeapYear) return 29;
      return _daysInMonths[this.monthIndex];
    },
    weeks() {
      const weeks = [];
      let previousMonth = true, thisMonth = false, nextMonth = false;
      let day = this.previousMonthComps.days - this.firstWeekdayInMonth + 2;
      let month = this.previousMonthComps.month;
      let year = this.previousMonthComps.year;
      for (let w = 1; w <= 6 && !nextMonth; w++) {
        const week = [];
        for (let d = 1; d <= 7; d++) {
          if (previousMonth && d >= this.firstWeekdayInMonth) {
             day = 1;
            month = this.month;
            year = this.year;
            previousMonth = false;
            thisMonth = true;
					}
 
          const dayInfo = {
            label: (day && thisMonth) ? day.toString() : '',
            day,
            weekday: d,
            week: w,
            month,
            year,
            date: new Date(year, month - 1, day),
            beforeMonth: previousMonth,
            afterMonth: nextMonth,
            inMonth: thisMonth,
            isToday: day === _todayComps.day && month === _todayComps.month && year === _todayComps.year,
            isFirstDay: thisMonth && day === 1,
            isLastDay: thisMonth && day === this.daysInMonth,
          };
          this.$emit('configureDay', dayInfo);
          week.push(dayInfo);
          if (thisMonth && day >= this.daysInMonth) {
            thisMonth = false;
            nextMonth = true;
            day = 1;
            month = this.nextMonthComps.month;
            year = this.nextMonthComps.year;
          } else {
          	day++;
          }
        }
        weeks.push(week);
      }
      return weeks;
    },
  },
  methods: {
    moveThisMonth() {
      this.month = _todayComps.month;
      this.year = _todayComps.year;
    },
    moveNextMonth() {
      const { month, year } = this.nextMonthComps;
      this.month = month;
      this.year = year;
    },
    movePreviousMonth() {
      const { month, year } = this.previousMonthComps;
      this.month = month;
      this.year = year;
    },
    moveNextYear() {
      this.year++;
    },
    movePreviousYear() {
      this.year--;
    },
  },
});

Vue.component('single-date-picker', {
	created() {
  	this.$on('configureDay', this.configureDay);
  	this.$on('selectDay', this.selectDay);
  },
  extends: calendar,
  props: {
    value: Date,
  },
  computed: {
    hasValue() {
      return this.value && typeof this.value.getTime === 'function';
    },
  	valueTime() {
    	return this.hasValue ? this.value.getTime() : null;
    },
  },
  methods: {
  	configureDay(day) {
    	day.isSelected = day.date.getTime() === this.valueTime;
    },
    selectDay(day) {
    	this.$emit('input', day.isSelected ? null : day.date);
    }
  },
});

const _displayKeyOptions = [
  { id: 'label', value: 'label', label: 'Label' },
  { id: 'number', value: 'day', label: 'Day' },
  { id: 'weekday', value: 'weekday', label: 'Weekday' },
  { id: 'week', value: 'week', label: 'Week' },
  { id: 'month', value: 'month', label: 'Month' },
  { id: 'year', value: 'year', label: 'Year' },
  { id: 'beforeMonth', value: 'beforeMonth', label: 'Before Month' },
  { id: 'afterMonth', value: 'afterMonth', label: 'After Month' },
  { id: 'inMonth', value: 'inMonth', label: 'In Month' },
  { id: 'isToday', value: 'isToday', label: 'Is Today' },
  { id: 'isFirstDay', value: 'isFirstDay', label: 'Is First Day' },
  { id: 'isLastDay', value: 'isLastDay', label: 'Is Last Day' },
];

const _selectModeOptions = [
  { id: 'single', value: 'single', label: 'Single Date' },
 ];

new Vue({
  el: '#app',
  data: {
    displayKeyOptions: _displayKeyOptions,
    displayKey: _displayKeyOptions[1].value,
    dateVal: null,
  },
  computed: {
    datePicker() {
        return 'single-date-picker';
    },
    dateValLabel() {
      return JSON.stringify(this.dateVal, null, '\t');
    }
  },
  watch: {
    selectMode() {
      this.dateVal = null;
    },
  },
});