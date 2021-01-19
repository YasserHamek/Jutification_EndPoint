export class Justification {
    private paragraphArray: string[] = [];
    private textArray: string[] = [];
    private finalText: string[];
    
    constructor(){}

    MainJustificationMethod(text: string): string{
        this.paragraphArray = [];
        this.textArray = [];
        this.finalText = [];

        if(text.includes('\n')){
            this.paragraphArray = text.split('\n');   
        }else{
            this.paragraphArray.push(text);
        } 

        this.paragraphArray = this.paragraphArray.map((value)=>value.concat('\n'));

        //calling SlicingTextMethod
        this.paragraphArray.forEach((value) => this.SlicingText(value))
        
        //calling justifyLine method
        this.textArray.forEach((value) => this.finalText.push(this.justifyLine(value)));
        
        return this.finalText.join('\n');
    }

    //slice the text in small texts, return an array of small texts 
    SlicingText(text: string): string[]{
        let editedText: string = text;
        let spanIndex: number = 0;
        let isEndOfText: boolean = false;
        
        //repeating the slicing operation to have string's of 80 caracter or lesser
        while(!isEndOfText){

            if (editedText.length>80){

                if(editedText.charAt(79)===' '){
                    //the case where this line end with span
                    this.textArray.push(editedText.slice(0,80))
                    editedText= editedText.slice(79,editedText.length)
                }else {
                    //finding the span in the text
                    let i : number = 0;
                    let condition: boolean = false;
            
                    while(!condition && i<79){
                        i++;
                        if(editedText.charAt(79-i)===' '){
                            condition = true;
                            spanIndex=i;
                        }
                    }
                    //checking if the word does not contains 79 caracter
                    if(spanIndex===80){
                        this.textArray.push(editedText.slice(0,80));
                        editedText= editedText.slice(79,editedText.length);
                    } else {
                        this.textArray.push(editedText.slice(0,80-spanIndex))
                        editedText= editedText.slice(80-spanIndex,editedText.length)  
                    }
                }

            }else {
                this.textArray.push(editedText);
                isEndOfText=true;
            }
        }
        return this.textArray;
    }

    //Second step : making the space in the strings equal as possible 
    justifyLine(line: string): string{
        let outPutLine = line;
        let numberOfSpan: number = 0;

        outPutLine = outPutLine.trimStart().trimRight();
        numberOfSpan = 80 - outPutLine.length;

        if(numberOfSpan===0){
            return outPutLine;
        }else {
            outPutLine = this.AddingSpanToLine(outPutLine,numberOfSpan);
            outPutLine = outPutLine.trimStart();
            
            if(outPutLine.includes('                         ')){
                while(outPutLine.includes('    ')){
                    outPutLine = outPutLine.replace('    ',' ');
                }
            }

            return outPutLine;
        }


    }

    AddingSpanToLine(line: string, spanNumber: number): string{
        let spanNum: number = spanNumber;
        let inPutLine: string = line;
        let outPutLine: string = '';
        let i: number = 0;

        while(i<spanNum*2 && spanNumber!=0){
            if(i%2===0){
                outPutLine= outPutLine.concat(inPutLine.slice(0,inPutLine.search(' ')+1)+' ');
                inPutLine = inPutLine.slice(inPutLine.search(' ')+1);
            }else {
                outPutLine= outPutLine.concat(inPutLine.slice(0,inPutLine.search(' ')+1));
                inPutLine = inPutLine.slice(inPutLine.search(' ')+1);
            }
            i++;
        }

        if(inPutLine.length>1){
            outPutLine= outPutLine.concat(inPutLine);
        }
        return outPutLine;
    }

}

