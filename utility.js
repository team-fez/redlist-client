var coloursArray = ['#FFEDA0','#FED976','#FEB24C','#FD8D3C','#FC4E2A','#E31A1C','#BD0026','#800026'];

var rangeArray = [0,10,20,50,100,200,500,1000];

    // get color depending on population density value
    function getColor(d) 
    {
console.log("getColor " + d);
        for (var i = rangeArray.length - 1; i >= 0; i--) 
        {

            if (d > rangeArray[i]) 
                {
                                console.log("getColor " + coloursArray[i]);

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
      return d > 1000 ? '#800026' :
             d > 500  ? '#BD0026' :
             d > 200  ? '#E31A1C' :
             d > 100  ? '#FC4E2A' :
             d > 50   ? '#FD8D3C' :
             d > 20   ? '#FEB24C' :
             d > 10   ? '#FED976' :
                        '#FFEDA0';
    }