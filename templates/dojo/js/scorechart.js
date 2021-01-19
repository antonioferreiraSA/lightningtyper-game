var base_url = location.origin;


$(document).ready(function(){

    //scorechart initialization

    var startdate = moment().subtract(6,"days").format('YYYY-MM-DD');
    var enddate=moment().format('YYYY-MM-DD');
    $('.date-year').html(moment().subtract(6,"days").format('MMM-DD-YYYY') + ' - ' + moment().format('MMM-DD-YYYY'));
    $('.wpm-date-year').html(moment().subtract(6,"days").format('MMM-DD-YYYY') + ' - ' + moment().format('MMM-DD-YYYY'));
    $('.dropdown-date-year').html(moment().subtract(6,"days").format('MMM-DD-YYYY') + ' - ' + moment().format('MMM-DD-YYYY'));

    //onloadpage 7 days lesson score
     dynamicChart(startdate,enddate);

    //onloadpage 7 days test score
    testDynamicChart(startdate,enddate);

    wpmDynamicChart(startdate,enddate);
   
  
    //update avatar
     $('input:file').change(
        function(e) {
            var files = e.originalEvent.target.files;
            for (var i=0, len=files.length; i<len; i++){
                var n = files[i].name,
                    s = files[i].size,
                    t = files[i].type;
    
                if (s != "") {
                    // console.log('Please deselect this file: "' + n + '," it\'s larger than the maximum filesize allowed. Sorry!');
                    $('.message').css("display","none");
                }
            }
        });
    $('.updateAvatar').on('click',function(){
      var formdata=  new FormData($('#uploadimage')[0]); 
     
      $('.loader').css("display","block");
      jQuery.ajax({
        enctype: 'multipart/form-data',
      url: base_url+'/member/avatar_upload.php',
  
      data: formdata,
  
      type:"POST",
      processData: false,
      contentType: false,
      cache:false,
        
    dataType: "json",
      success: function(response){
        $('.loader').css("display","none");
        $('.message').append(response.msg);
        $('.message').css("display","block");

      

      }
      });
       
     });  
    
      

    //on change of selec box test graph load
    $('#test-myselect').on('change',function(){ 

      var data=$(this).val();
      var parts=data.split(' ');
      var startval=parts[1]-1;
      var start = moment().subtract(startval,"days").format('YYYY-MM-DD');
      var end=moment().format('YYYY-MM-DD');
      $('.dropdown-date-year').html(moment().subtract(startval,"days").format('MMM-DD-YYYY') + ' - ' + moment().format('MMM-DD-YYYY'));
     
      testDynamicChart(start,end);

    });

    //on change of selec box wpm graph load
    $('#wpm-test-myselect').on('change',function(){ 

      var data=$(this).val();
      var parts=data.split(' ');
      var startval=parts[1]-1;
      var start = moment().subtract(startval,"days").format('YYYY-MM-DD');
      var end=moment().format('YYYY-MM-DD');
      $('.wpm-date-year').html(moment().subtract(startval,"days").format('MMM-DD-YYYY') + ' - ' + moment().format('MMM-DD-YYYY'));
     
      wpmDynamicChart(start,end);

    });

    //on change of selec box lesson graph load
    $('#myselect').on('change',function(){ 

      var data=$(this).val();
      var parts=data.split(' ');
      var startval=parts[1]-1;
      var start = moment().subtract(startval,"days").format('YYYY-MM-DD');
      var end=moment().format('YYYY-MM-DD');
      $('.date-year').html(moment().subtract(startval,"days").format('MMM-DD-YYYY') + ' - ' + moment().format('MMM-DD-YYYY'));
     
       dynamicChart(start,end);

    });

  });

   

 

function dynamicChart(startdate,enddate){
    
   // fetching data from db
   jQuery.ajax({

    url: base_url+'/ajax.php',

    data: {'p': 'scorechart','startdate':startdate,'enddate':enddate},

    type:"POST",

    cache:false,

    dataType: "json",

    success: function(response){
   

          function removeDataset(chart) {
                chart.data.datasets = [];
            };
          var weightChartOptions = {
            legendCallback: function(Chart) {

              if($('.tabs li').length >0)
              {
                
              }
              else
              {
              var text=[];
              // text.push('<ul class="tabs">');
              for(var i=0;i<Chart.data.datasets.length;i++)
              {
               text.push('<li id="legend-' + i + '-item" style="background:'+Chart.data.datasets[i].borderColor +';cursor:pointer" class="tabs-title" onclick="updateDataset(event, ' + '\'' + Chart.legend.legendItems[i].datasetIndex + '\'' + ')">');
               text.push(Chart.data.datasets[i].label);
               text.push('</li>');

              }

              return text.join('');
            }
           },
           legend: {                                                                              
            //  display: false ,
            onClick: null                                                                    
           },
               responsive: true,
                maintainAspectRatio: false,
               scales: {
                 xAxes: [{
        
                     type: 'time',
                     time: {
                      
                       unit: 'day',
                        tooltipFormat: 'll'+' '+'h:mm a',
                       displayFormats: {
                      //                   'millisecond': 'MMM DD',
                      // 'second': 'MMM DD',
                      // 'minute': 'MMM DD',
                      // 'hour': '',
                       'day': 'MMM DD'+', '+'YYYY',
                      // 'week': 'll'
                      //'month': 'MMM DD',
                      // 'quarter': 'MMM DD',
                      // 'year': 'MMM DD',
                       }
                     },
                      scaleLabel: {
                     display:     true,
                     labelString: 'Date'
                 }
                 }],
                  yAxes: [{
                 scaleLabel: {
                     display:     true,
                     labelString: 'Value'
                 }
             }]
             },
             title: {
               text: "Typing Lesson History Data",
               display:true,
               fontSize:20,
               // fontFamily: "New Times Roman",
               fontColor:'#f4d032'
             }

                                                                                                
        };

        var weightChartData= {
            datasets: [{
              label: 'Speed',
                
              fill:false,          
              borderColor: 'rgb(130, 204, 197)',
              data: JSON.parse(response.speed)
          }
          ,{
              label: 'Accuracy',
              // hidden: true,   
              fill:false,          
              borderColor: 'rgb(255, 82, 82)',
              data: JSON.parse(response.accuracy)
          }
          ,{
              label: 'Time Taken',
              // hidden: true,  
              fill:false,           
              borderColor: 'rgb(235, 209, 42)',
              data: JSON.parse(response.time)

          }
        ]
        };
         // Show/hide chart by click legend
          updateDataset = function(e, datasetIndex) {
            var index = datasetIndex;
            var ci = e.view.weightChart;
            var meta = ci.getDatasetMeta(index);

            // See controller.isDatasetVisible comment
            meta.hidden = meta.hidden === null? !ci.data.datasets[index].hidden : null;
            var path = e.path || (e.composedPath && e.composedPath());
            if(meta.hidden===true)
              {
                $('#' + path[0].id).css("background","#fff");
              }
              if(meta.hidden===null)
              {
                $('#' + path[0].id).css("background", ci.data.datasets[index].borderColor);
              }

              
            // We hid a dataset ... rerender the chart
            ci.update();
        };  
            
            // window.weightChart.data.datasets = [];
            // weightChart.update();
            $('#weightChart').remove();
            $('.graph-activites').append('<canvas id="weightChart" width="400" height="400"></canvas>');
            var ctx = document.getElementById("weightChart").getContext("2d");
            window.weightChart = new Chart(ctx, {
            label: JSON.parse(response.label),
            type: 'line',
            data: weightChartData, 
            options: weightChartOptions
            });
        // document.getElementById("chartjs-legend").innerHTML = weightChart.generateLegend();
        $('#legend-0-item').remove();
        $('#legend-1-item').remove();
        $('#legend-2-item').remove();
        $(".tabs").prepend(weightChart.generateLegend());
          // $('#chartjs-legend').html(weightChart.generateLegend());
    },

    error: function(response){

        console.log("Error");

    }

  })
}
function testDynamicChart(startdate,enddate){
   // fetching data from db for test score chart
   jQuery.ajax({

    url: base_url+'/ajax.php',

    data: {'p': 'testscorechart','startdate':startdate,'enddate':enddate},

    type:"POST",

    cache:false,

    dataType: "json",

    success: function(response){

          var ChartOptions = {
            legendCallback: function(Chart) {

              if($('.legend-tabs li').length >0)
              {
                
              }
              else
              {
              var text=[];
              // text.push('<ul class="tabs">');
              for(var i=0;i<Chart.data.datasets.length;i++)
              {
               text.push('<li id="tab-' + i + '-item" style="background:'+Chart.data.datasets[i].borderColor +';cursor:pointer" class="legend-tabs-title" onclick="updateTestDataset(event, ' + '\'' + Chart.legend.legendItems[i].datasetIndex + '\'' + ')">');
               text.push(Chart.data.datasets[i].label);
               text.push('</li>');

              }
              return text.join('');
            }
           },
           legend: {                                                                              
            //  display: false ,
            onClick: null                                                                    
           },
                responsive: true,
                maintainAspectRatio: false,
               scales: {
                 xAxes: [{
        
                     type: 'time',
                     time: {
                      
                       unit: 'day',
                        tooltipFormat: 'll'+' '+'h:mm a',
                       displayFormats: {
                      //                   'millisecond': 'MMM DD',
                      // 'second': 'MMM DD',
                      // 'minute': 'MMM DD',
                      // 'hour': '',
                       'day': 'MMM DD'+', '+'YYYY',
                      // 'week': 'll'
                      //'month': 'MMM DD',
                      // 'quarter': 'MMM DD',
                      // 'year': 'MMM DD',
                       }
                     },
                      scaleLabel: {
                     display:     true,
                     labelString: 'Date'
                 }
                 }],
                  yAxes: [{
                 scaleLabel: {
                     display:     true,
                     labelString: 'Value'
                 }
             }]
             },
             title: {
               text: "Typing Test History Data",
               display:true,
               fontSize:20,
               // fontFamily: "New Times Roman",
               fontColor:'#f4d032'
             }

                                                                                                
        };

        var ChartData= {
            datasets: [{
              label: 'Speed',
                
              fill:false,          
              borderColor: 'rgb(130, 204, 197)',
              data: JSON.parse(response.speed)
          }
          ,{
              label: 'Accuracy',
              // hidden: true,   
              fill:false,          
              borderColor: 'rgb(255, 82, 82)',
              data: JSON.parse(response.accuracy)
          }
          ,{
              label: 'Time Taken',
              // hidden: true,  
              fill:false,           
              borderColor: 'rgb(235, 209, 42)',
              data: JSON.parse(response.time)

          }
        ]
        };
         // Show/hide chart by click legend
         updateTestDataset = function(e, datasetIndex) {
            var index = datasetIndex;
            var ci = e.view.testChart;
           
            var meta = ci.getDatasetMeta(index);

            // See controller.isDatasetVisible comment
            meta.hidden = meta.hidden === null? !ci.data.datasets[index].hidden : null;
            var path = e.path || (e.composedPath && e.composedPath());
            if(meta.hidden===true)
              {
                $('#' + path[0].id).css("background","#fff");
              }
              if(meta.hidden===null)
              {
                $('#' + path[0].id).css("background", ci.data.datasets[index].borderColor);
              }

            
            // We hid a dataset ... rerender the chart
            ci.update();
        };  
            
            // window.weightChart.data.datasets = [];
            // weightChart.update();
            $('#testChart').remove();
            $('.test-graph-activites .wrapper').append('<canvas id="testChart" width="400" height="400"></canvas>');
            var ctx = document.getElementById("testChart").getContext("2d");
             window.testChart = new Chart(ctx, {
            label: JSON.parse(response.label),
            type: 'line',
            data: ChartData, 
            options: ChartOptions
            });
           
        // document.getElementById("chartjs-legend").innerHTML = weightChart.generateLegend();
        $('#tab-0-item').remove();
        $('#tab-1-item').remove();
        $('#tab-2-item').remove();
        $(".legend-tabs").prepend(testChart.generateLegend());
          // $('#chartjs-legend').html(weightChart.generateLegend());
    },

    error: function(response){

        console.log("Error");

    }

  })
}

function wpmDynamicChart(startdate,enddate){
   // fetching data from db for wpm score chart
   jQuery.ajax({

    url: base_url+'/ajax.php',

    data: {'p': 'wpmscorechart','startdate':startdate,'enddate':enddate},

    type:"POST",

    cache:false,

    dataType: "json",

    success: function(response){

          var ChartOptions = {
            legendCallback: function(Chart) {

              if($('.wpm-legend-tabs li').length >0)
              {
                
              }
              else
              {
              var text=[];
              // text.push('<ul class="tabs">');
              for(var i=0;i<Chart.data.datasets.length;i++)
              {
               text.push('<li id="wpm-tab-' + i + '-item" style="background:'+Chart.data.datasets[i].borderColor +';cursor:pointer" class="wpm-legend-tabs-title" onclick="updateWpmDataset(event, ' + '\'' + Chart.legend.legendItems[i].datasetIndex + '\'' + ')">');
               text.push(Chart.data.datasets[i].label);
               text.push('</li>');

              }
              return text.join('');
            }
           },
           legend: {                                                                              
            //  display: false ,
            onClick: null                                                                    
           },
                responsive: true,
                maintainAspectRatio: false,
               scales: {
                 xAxes: [{
        
                     type: 'time',
                     time: {
                      
                       unit: 'day',
                        tooltipFormat: 'll'+' '+'h:mm a',
                       displayFormats: {
                      //                   'millisecond': 'MMM DD',
                      // 'second': 'MMM DD',
                      // 'minute': 'MMM DD',
                      // 'hour': '',
                       'day': 'MMM DD'+', '+'YYYY',
                      // 'week': 'll'
                      //'month': 'MMM DD',
                      // 'quarter': 'MMM DD',
                      // 'year': 'MMM DD',
                       }
                     },
                      scaleLabel: {
                     display:     true,
                     labelString: 'Date'
                 }
                 }],
                  yAxes: [{
                 scaleLabel: {
                     display:     true,
                     labelString: 'Value'
                 }
             }]
             },
             title: {
               text: "Wpm Test History Data",
               display:true,
               fontSize:20,
               // fontFamily: "New Times Roman",
               fontColor:'#f4d032'
             }

                                                                                                
        };

        var ChartData= {
            datasets: [{
              label: 'Speed',
                
              fill:false,          
              borderColor: 'rgb(130, 204, 197)',
              data: JSON.parse(response.speed)
          }
          ,{
              label: 'Accuracy',
              // hidden: true,   
              fill:false,          
              borderColor: 'rgb(255, 82, 82)',
              data: JSON.parse(response.accuracy)
          }
          ,{
              label: 'Time Taken',
              // hidden: true,  
              fill:false,           
              borderColor: 'rgb(235, 209, 42)',
              data: JSON.parse(response.time)

          }
        ]
        };
         // Show/hide chart by click legend
         updateWpmDataset = function(e, datasetIndex) {
            var index = datasetIndex;
            var ci = e.view.wpmChart;
           
            var meta = ci.getDatasetMeta(index);

            // See controller.isDatasetVisible comment
            meta.hidden = meta.hidden === null? !ci.data.datasets[index].hidden : null;
            var path = e.path || (e.composedPath && e.composedPath());
            if(meta.hidden===true)
              {
                $('#' + path[0].id).css("background","#fff");
              }
              if(meta.hidden===null)
              {
                $('#' + path[0].id).css("background", ci.data.datasets[index].borderColor);
              }

            
            // We hid a dataset ... rerender the chart
            ci.update();
        };  
            
            // window.weightChart.data.datasets = [];
            // weightChart.update();
            $('#wpmChart').remove();
            $('.wpm-graph-activites .rapper').append('<canvas id="wpmChart" width="400" height="400"></canvas>');
            var ctx = document.getElementById("wpmChart").getContext("2d");
             window.wpmChart = new Chart(ctx, {
            label: JSON.parse(response.label),
            type: 'line',
            data: ChartData, 
            options: ChartOptions
            });
           
        // document.getElementById("chartjs-legend").innerHTML = weightChart.generateLegend();
        $('#wpm-tab-0-item').remove();
        $('#wpm-tab-1-item').remove();
        $('#wpm-tab-2-item').remove();
        $(".wpm-legend-tabs").prepend(wpmChart.generateLegend());
          // $('#chartjs-legend').html(weightChart.generateLegend());
    },

    error: function(response){

        console.log("Error");

    }

  })
}

//for image preview
function readURL(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
          $('#imagePreview').css('background-image', 'url('+e.target.result +')');
          $('#imagePreview').hide();
          $('#imagePreview').fadeIn(650);
      }
      reader.readAsDataURL(input.files[0]);
  }
}
$("#imageUpload").change(function() {
  readURL(this);
});
  

    
   
