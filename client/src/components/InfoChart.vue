<template>
    <div id='app'>
    <div class="q-pa-lg row justify-start">
        <div class="q-pa-md text-h5">Gráficos de Relevância</div>
        <q-select class="q-pa-md  text-h6" style="width:280px;height:40px" outlined filled v-model="yearchoice" :options="options" label="Faturamentos Mensais" />
    </div>

    <GChart class="q-pa-md"
      :settings="{packages: ['bar']}"    
      :data="chartData"
      :options="chartOptions"
      :createChart="(el, google) => new google.charts.Bar(el)"
      @ready="onChartReady"
      style="height:600px;width:900px"    
    />
    </div>
  </template>
  
  <script>
  import { GChart } from 'vue-google-charts'
  import {ref} from 'vue'
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
          ['Year', 'Faturamento'],
          ['2014', 1000],
          ['2015', 1170],
          ['2016', 660],
          ['2017', 1030]
        ],
      }
    },
    computed: {
      chartOptions () {
        if (!this.chartsLib) return null
        return this.chartsLib.charts.Bar.convertOptions({
          chart: {
            title: 'Vendas Mensais',
          },
          bars: 'vertical', // Required for Material Bar Charts.
          bar: {groupWidth: "25%"},
          height: 400,
          colors: ['#1b9e77']
        })
      },
        yearchoice:ref(null),
        options:[
            '2022','2021','2020','2019','2018','2017',
        ]
    },
    methods: {
      onChartReady (chart, google) {
        this.chartsLib = google
      }
    }
  }
  </script>
  