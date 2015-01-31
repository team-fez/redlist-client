var coloursArray = ['#FFEDA0','#FED976','#FEB24C','#FD8D3C','#FC4E2A','#E31A1C','#BD0026','#800026'];

var rangeArray = [0,10,20,50,100,200,500,1000];

    // get color depending on population density value
    function getColor(d) 
    {
        getRange(0,150);
        for (var i = rangeArray.length - 1; i >= 0; i--) 
        {
            if (d > rangeArray[i]) 
                {
                    return coloursArray[i];
                }
        }

      // return d > 1000 ? coloursArray[7] :
      //        d > 500  ? coloursArray[6] :
      //        d > 200  ? coloursArray[5] :
      //        d > 100  ? coloursArray[4] :
      //        d > 50   ? coloursArray[3] :
      //        d > 20   ? coloursArray[2] :
      //        d > 10   ? coloursArray[1] :
      //                   coloursArray[0];
    }

    function getRange(min, max) 
    {
        var interval = max - min;
        var steps = interval / 8;
        for (var i = coloursArray.length - 1; i >= 0; i--) {
            rangeArray[i] = min + i * steps;
        };
    }