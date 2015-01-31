var coloursArray = ['#FFEDA0','#FED976','#FEB24C','#FD8D3C','#FC4E2A','#E31A1C','#BD0026','#800026'];

var rangeArray = [0,10,20,50,100,200,500,1000];

getRange(0,150);

    // get color depending on population density value
    function getColor(d) 
    {
        for (var i = rangeArray.length - 1; i >= 0; i--) 
        {
            if (d > rangeArray[i]) 
                {
                    return coloursArray[i];
                }
        }
    }

    function getRange(min, max) 
    {
        var interval = max - min;
        var steps = interval / 8;
        for (var i = rangeArray.length - 1; i >= 0; i--) {
            rangeArray[i] = min + i * steps;
        };
    }