
export class Justification {

    private textArray : string[] = [];
    
    constructor(){}

    //slice the text in small texts, return an array of small texts 
    //( if have time make the number of caracter as in input)
    SlicingText(text: string): string[]{
        let indexOfBeginning: number=0;
        let indexOfSlicedText : number =0;
        let storedNumber : number = 0;

        if (text.length>80){
            
            //repeating the slicing operation to have string's of 80 caracter or lesser
            while(indexOfSlicedText !>= text.length){
                
                indexOfBeginning=indexOfSlicedText;

                //the case where the string end with space
                if(text.charAt(indexOfBeginning+79)==''){
                    indexOfSlicedText=indexOfBeginning+80;
                    this.textArray.push(text.slice(indexOfBeginning,indexOfSlicedText))
                }else {
                    //finding the space in the text
                    let i : number = 0;
                    let condition: boolean = false;
            
                    while(!condition && i<indexOfBeginning+79){
                        i++;
                        if(text.charAt(indexOfBeginning+79-i)==''){
                            condition = true;
                        }
                        storedNumber=i;
                    }
                    //checking if the word does not contains 79 caracter
                    if(storedNumber===indexOfBeginning+80){
                        indexOfSlicedText=indexOfBeginning+80;
                        this.textArray.push(text.slice(indexOfBeginning,indexOfSlicedText));
                    } else {
                        indexOfSlicedText=indexOfBeginning+80-storedNumber;
                        this.textArray.push(text.slice(indexOfBeginning,indexOfSlicedText))  
                    }
                }
            }

        
        }else {
            this.textArray.push(text);
        }

        return this.textArray;
    }

    //Second step : making the space in the strings equal as possible 
    justifyText(){

    }
}

//some test
let justifyClass: Justification = new Justification();
let arrayText: string[];
let text: string;

text='qlsjghs fdkjghqdf kjghqkfljghqs dkjfhgsqkdjghksq djghksqjdghks qjdhgksqrtyyrt   '

arrayText=justifyClass.SlicingText(text);

console.log(text.length)
console.log(arrayText)
console.log(arrayText[0].length)
