var coloursArray = ['#FFEDA0','#FED976','#FEB24C','#FD8D3C','#FC4E2A','#E31A1C','#BD0026','#800026'];

var rangeArray = [0,10,20,50,100,200,500,1000];

var options = {
  logaritmicScale: false
};

// get color depending on population density value
function getColor(d) 
{
    for (var i = rangeArray.length - 1; i >= 0; i--) 
    {
        if (d > rangeArray[i] || i == 0) 
            {
                return coloursArray[i];
            }
    }
}

function setMax(max) 
{
    if(options.logaritmicScale)
    {
        var steps = Math.pow(max, 1/8);

        for (var i = rangeArray.length - 1; i >= 0; i--) {
            rangeArray[i] = Math.ceil(Math.pow(steps, i));
        };
    }   
    else
    {
        var steps = max / 8;
        for (var i = rangeArray.length - 1; i >= 0; i--) {
            rangeArray[i] = Math.ceil(i * steps);
        };
    }
}