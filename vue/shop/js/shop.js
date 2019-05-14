  
(function(){

    let products = [
      {
        id: 1,
        name: 'chocolate',
        price: 500,
        count: 0,
      },
      {
        id: 2,
        name: 'cofee',
        price: 200,
        count: 0,
      },
      {
        id: 3,
        name: 'oil',
        price: 300,
        count: 0,
      },
      {
        id: 4,
        name: 'apple',
        price: 400,
        count: 0,
      },
      {
        id: 5,
        name: 'berry',
        price: 500,
        count: 0,
      },
      {
        id: 6,
        name: 'bilberry',
        price: 800,
        count: 0,
      },
      {
        id: 7,
        name: 'cabbage',
        price: 420,
        count: 0,
      },
      {
        id: 8,
        name: 'cheese',
        price: 350,
        count: 0,
      },
      {
        id: 9,
        name: 'chips',
        price: 1200,
        count: 0,
      },
      {
        id: 10,
        name: 'cinnamon',
        price: 1000,
        count: 0,
      },
    ];

    new Vue({
        el: '#app',
        data: {
          ingrArr: JSON.parse(localStorage.ingrCw7 || JSON.stringify(products)),
        },
        methods: {
          add: function(item) { 
            item.count++;
          },
          remove: function(item) {
            item.count--;
          }
        },
        computed: {
            total_price: function() {
            let total = 0;
            this.ingrArr.forEach((el) => {
              if (el.count) {
                total += el.price * el.count;
              }
            });
            return total;
          },
        },
        watch: {
          ingrArr: {
            handler: (value) => {
              localStorage.ingrCw7 = JSON.stringify(value);
            },
            deep: true,
          },
        },
      });
    
    }())