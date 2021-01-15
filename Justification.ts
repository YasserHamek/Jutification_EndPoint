
export class Justification {
    private paragraphArray: string[] = [];
    private textArray: string[] = [];
    private finalText: string[] = [];
    
    constructor(){}

    Justification(text: string): string[]{
        
        for(let c of text){
            if(c==='\n'){
                this.paragraphArray = text.split('\n');   
            }
        }
        if (this.paragraphArray.length===0){
            this.paragraphArray.push(text)
        }

        this.paragraphArray = this.paragraphArray.map((value)=>value.concat('\n'));


        /*calling SlicingTextMethod

        this.finalText = textArray.map( (value) => JustifyLine(value) )*/
        
        return this.paragraphArray;
    }

    //slice the text in small texts, return an array of small texts 
    SlicingText(text: string): string[]{
        let editedText: string = text;
        let storedNumber: number = 0;
        let breakCondition: boolean = false;
        
        //repeating the slicing operation to have string's of 80 caracter or lesser
        while(!breakCondition){

            if (editedText.length>80){

                if(editedText.charAt(79)==' '){
                    //the case where this line end with space
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
                        editedText= editedText.slice(80-storedNumber,editedText.length)  
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
    justifyLine(text: string): string{
        let i: boolean = false;

        

        return null;
    }
}

//some test
let justifyClass: Justification = new Justification();
let arrayText: string[];
let text: string;

text='hello justification algorithme hello justification\n algorithme hello justification algorithme\n hello justification algorithme hello justification algorithme hello justification algorithme hello justification algorithme hello justification algorithme hello justification algorithme '
console.log(text.length)

let paragraphe = justifyClass.Justification(text);

console.log(paragraphe);
console.log(paragraphe.length)


//Slicing Text Test
for (let i in paragraphe){
console.log(i)
}
/*
arrayText=justifyClass.SlicingText(paragraphe[i]);

console.log(text.length)
console.log(arrayText)
console.log(arrayText[0].length)*/
