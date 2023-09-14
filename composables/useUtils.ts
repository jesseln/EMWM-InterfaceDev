import * as d3 from "d3";

export const useUtils = () => {
    //Returns the longest series of numbers in a string
    function handleNumeric(value: any){
        const longestNumber = coerceNumber(longestNumberString(value))
        return longestNumber
    }
    function longestNumberString(value: any){
        if(isString(value)){
            let longest = '';
            let i = 0;
            while (i < value.length) {
                while (i < value.length && !isNumber(value[i])) {
                    ++i;
                }
                let start = i;
                while (i < value.length && isNumber(value[i])) {
                    ++i;
                }
                if (i - start > longest.length) {
                    longest = value.slice(start, i);
                }
            }   
            return longest
        }else if(isNumber(value)){
            return value
        }else{
            return value
        }
    }

    //Checks all properties on path exist and returns handled value
    function handleObjectPath(item: any, viewMode: string, ...path: any) {
        if(!item) return false
        let obj = item;
        for (let i = 0; i < path.length; i++) {
            let prop = path[i];
        
            if (!obj || !obj.hasOwnProperty(prop)) {
              return false;
            } else {
              obj = obj[prop];
            }
          }
          if(viewMode === 'colour') {
              return handleColourValue(obj);
            }else if(viewMode === 'height'){
              return handleValue(obj);
          }else{
              return handleValue(obj);
          }

    }

    //Returns handled values based on type
    function handleValue(value: any){
        if(!value || value.length === 0) return false

        if(isNumber(value)){
            return handleNumeric(value)
            
        }else if(isString(value)){
            return value

        }else if(isArray(value)){
            return handleArray(value)

        }
    }

    //Returns unpacked array values for non-specialised viewModes
    //For arrays longer than one position returns string split by ', ' and '&' before last position.
    function handleArray(value: any){
        if(!value || value.length === 0) return false

        if(value.length === 1){
            return value[0]
        }else{
            value.sort()
            return value.slice(0, -1).join(', ')+' & '+value.slice(-1);
        }
    }

    //Returns values for special case of Colour viewMode
    function handleColourValue(value: any){
        if(!value || value.length === 0) return false

        if(isNumber(value)){
            return handleNumeric(value)
            
        }else if(isString(value)){
            return value

        }else if(isArray(value)){
            return value[0]

        }
    }

    //Clamp Function
    const clamp = (min: any, value: any, max: any) => value ? Math.min(Math.max(value, min), max) : value
    //Numeric coersion of single value
    const coerceNumber = (value: any) => isNumber(value) ? Number(value) : value
    //Numeric check of single value
    const isNumber = (value: any) => !isNaN(value) && !isNaN(parseFloat(value))
    //String check of single value
    const isString = (value: any) => typeof(value)==='string'
    //Array check of single value
    const isArray = (value: any) => Array.isArray(value)
    //Return type of value if String or Array
    function isStringOrArray(value: any){
        if(isArray(value)) return 'array'
        if(isString(value)) return 'string'
        return null
    }
    //Check if any value in array is a number
    function containsStringOrArray(data: any, viewSelection: string){
        const typeFound = data.find((d: any) => isArray(d[viewSelection]) || isString(d[viewSelection]))
        return isStringOrArray(typeFound[viewSelection])
    }
    //Check if any value in array is a number
    const containsNumber = (data: any, viewSelection: string) => data.some((d: any) => isNumber(d[viewSelection]))
    //Check if any value in array is string
    const containsString = (data: any, viewSelection: string) => data.some((d: any) => typeof(d[viewSelection])==='string')
    //Check if any value in array is array
    const containsArray = (data: any, viewSelection: string) => data.some((d: any) => Array.isArray(d[viewSelection]))
    //Return index of minimum element for given view selection
    const minItemIndex = (data: any, viewSelection: string) => d3.minIndex(data, (d: any) => handleNumeric(d[viewSelection]))
    //Return index of maximum element for given view selection
    const maxItemIndex = (data: any, viewSelection: string) => d3.maxIndex(data, (d: any) => handleNumeric(d[viewSelection]))
    //
    function processDomain(data: any, viewSelection: string){
        //More handler functions may be needed
        const domainIndex = {min: minItemIndex(data, viewSelection), max: maxItemIndex(data, viewSelection)}
        return domainIndex
    }
    //Returns shallow inverted object
    function invertObject (obj: any) {
        return Object.keys(obj).reduce((ret: any, key: any) => {
            ret[obj[key]] = key;
            return ret;
        }, {});
    }


    return {
        handleNumeric,
        clamp,
        longestNumberString,
        handleObjectPath,
        handleValue,
        handleArray,
        handleColourValue,
        coerceNumber,
        isNumber,
        isString,
        isArray,
        isStringOrArray,
        containsStringOrArray,
        containsNumber,
        containsString,
        containsArray,
        minItemIndex,
        maxItemIndex,
        processDomain,
        invertObject,
    }
}