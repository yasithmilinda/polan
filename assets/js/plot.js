// Hide all Elements first
$('#card').hide();
$('#card-body').css('width', "50%");
$('#card-body').css('opacity', 0);

var myLineChart;

var renderGraph = function (politician) {
    CSV.fetch({
        url: `assets/csv/${politician}.csv`
    }).done(function (dataset) {
        var labels = dataset.records.map(function (i) {
            // This is the month
            var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var r = i[0].split("/");
            return `${months[r[0] - 1]} ${r[1]}`;
        });
        var data = dataset.records.map(function (i) {
            return i[1];
        });
        var ctx = $("#sentiment-chart");
        if (myLineChart) myLineChart.destroy();
        myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: "Popularity",
                    data: data,
                    backgroundColor: "rgba(255,237,196,0.4)",
                    borderColor: "rgba(255,177,0,1)",
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        stacked: true,
                        gridLines: {
                            display: false
                        }
                    }]
                },
                animation: {
                    duration: 750,
                }
            }
        });
        myLineChart.update();
    });
}

// Fade In Card
$('#card').fadeIn(500, "swing", function () {
    // Fade In Card Body
    $('#card-body').fadeTo(500, 1, function () {});
    // Zoom In Card
    $('#card-body').animate({
        'width': "100%",
        'height': "100%"
    });
    // Render Graph
    renderGraph($(".politician")[0].value);
});

// Add dropdown selection changed listeners
$(".politician").change(function () {
    // Render graph for new politician
    renderGraph($(this)[0].value);
});