
export class Justification {

    private textArray: string[] = [];
    private textArrayJustified: string[] = [];
    
    constructor(){}

    //slice the text in small texts, return an array of small texts 
    SlicingText(text: string): string[]{
        let editedText: string = text;
        let storedNumber: number = 0;
        let breakCondition: boolean = false;
        
        //repeating the slicing operation to have string's of 80 caracter or lesser
        while(!breakCondition){

            if (editedText.length>80){
                
                //the case where the string end with space
                if(editedText.charAt(79)==' '){
                    this.textArray.push(editedText.slice(0,80))
                    editedText= editedText.slice(79,editedText.length)
                }else {
                    //finding the space in the text
                    let i : number = 0;
                    let condition: boolean = false;
            
                    while(!condition && i<79){
                        i++;
                        if(editedText.charAt(79-i)==' '){
                            condition = true;
                            storedNumber=i;
                        }
                    }
                    //checking if the word does not contains 79 caracter
                    if(storedNumber===80){
                        this.textArray.push(editedText.slice(0,80));
                        editedText= editedText.slice(79,editedText.length);
                    } else {
                        this.textArray.push(editedText.slice(0,80-storedNumber))
                        editedText= editedText.slice(79-storedNumber+1,editedText.length)  
                    }
                }
            
            }else {
                this.textArray.push(editedText);
                breakCondition=true;
            }
        }

        return this.textArray;
    }

    //Second step : making the space in the strings equal as possible 
    justifyText(textArray: string[]): string[]{
        let i: boolean = false;

        this.textArrayJustified = textArray.map( (value) => 
        
        value 
        
        
        )

        return this.textArrayJustified;
    }
}

//some test
let justifyClass: Justification = new Justification();
let arrayText: string[];
let text: string;

text='hello justification algorithme hello justification algorithme hello justification algorithme hello justification algorithme hello justification algorithme hello justification algorithme hello justification algorithme hello justification algorithme'

console.log('gjhgjh \n gfhgf')

arrayText=justifyClass.SlicingText(text);

console.log(text.length)
console.log(arrayText)
console.log(arrayText[0].length)
