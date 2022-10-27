<template>
    <div id='app'>
    <GChart
      :settings="{packages: ['bar']}"    
      :data="chartData"
      :options="chartOptions"
      :createChart="(el, google) => new google.charts.Bar(el)"
      @ready="onChartReady"
    />
    </div>
  </template>
  
  <script>
  import { GChart } from 'vue-google-charts'
  export default {
    name: 'App',
    components: {
      GChart
    },
    data () {
      return {
        chartsLib: null, 
        // Array will be automatically processed with visualization.arrayToDataTable function
        chartData: [
          ['YMonth', 'Sales'],
          [ { mes: 5, total: '94993.00' } ],
          [ { mes: 5, total: '94993.00' } ],
          [ { mes: 5, total: '94993.00' } ],
          [ { mes: 5, total: '94993.00' } ]
        ]
      }
    },
    computed: {
      chartOptions () {
        if (!this.chartsLib) return null
        return this.chartsLib.charts.Bar.convertOptions({
          chart: {
            title: 'Company Performance',
            subtitle: 'Sales, Expenses, and Profit: 2014-2017'
          },
          bars: 'horizontal', // Required for Material Bar Charts.
          hAxis: { format: 'decimal' },
          height: 400,
          colors: ['#1b9e77', '#d95f02']
        })
      }
    },
    methods: {
      onChartReady (chart, google) {
        this.chartsLib = google
      }
    }
  }
  </script>
  