export const currentSales = {
  series: [
    {
      name: 'series1',
      data: [6, 20, 15, 40, 18, 20, 18, 23, 18, 35, 30, 55, 0]
    }, {
      name: 'series2',
      data: [2, 22, 35, 32, 40, 25, 50, 38, 42, 28, 20, 45, 0]
    }
  ],
  chart: {
    height: 240,
    type: "area",
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: "smooth"
  },
  xaxis: {
    type: 'category',
    offsetX: 0,
    offsetY: 0,
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
    labels: {
      offsetX: 0,
      show: false,
    },
    axisBorder: {
      offsetX: 0,
      show: false,
    },
  },
  grid: {
    show: false,
    padding: {
      left: 0,
      right: 0,
      bottom: -15,
      top: -40
    }
  },
  legend: {
    show: false
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.5,
      stops: [0, 80, 100]
    }
  },
  tooltip: {
    x: {
      format: 'MM'
    },
  },
  yaxis: {
    show: false,
    labels: {
      offsetX: 0,
      show: false,
    },
    axisBorder: {
      offsetX: 0,
      show: false,
    },
  },
  markers: {
    strokeWidth: 3,
    strokeColors: ['#7366ff', '#f73164'],
    hover: {
      size: 6,
    }
  },
  colors: ['#7366ff', '#f73164'],
}

export const marketValue = {
  chart: {
    height: 380,
    type: 'radar',
    toolbar: {
      show: false
    },
  },
  series: [{
    name: 'Market value',
    data: [20, 100, 40, 30, 50, 80, 33],
  }],
  stroke: {
    width: 3,
    curve: 'smooth',
  },
  labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  plotOptions: {
    radar: {
      size: 140,
      polygons: {
        fill: {
          colors: ['#fcf8ff', '#f7eeff']
        },
      }
    }
  },
  colors: ['#fcf8ff'],
  markers: {
    size: 6,
    colors: ['#fff'],
    strokeColor: '#fcf8ff',
    strokeWidth: 3,
  },
  tooltip: {
    y: {
      formatter: function (val: any) {
        return val
      }
    }
  },
  yaxis: {
    tickAmount: 7,
    labels: {
      formatter: function (val: any, i: any) {
        if (i % 2 === 0) {
          return val
        } else {
          return ''
        }
      }
    }
  }
}
