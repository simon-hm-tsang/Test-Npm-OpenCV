// @interface
const IRun = {
    Run(){}
};

class Run {
    constructor(){
        this.main();
    }

    _start(iRun = IRun) {
        /* if(typeof iRun.Run === "undefined"){
            throw new Error("The pass by reference does not extend to IRun");
        } */

        iRun.Run();
    }
    
    // main<IRunClass> where IRunClass : IRun
    main(arg = process.argv) {
        // process.argv[2] should be the class name
        const IRunClass = require(`./src/${arg[2]}`);

        try{
            this._start(new IRunClass());
        }
        catch(exception){
            throw exception;
        }
    }
}

module.exports = IRun;

new Run();