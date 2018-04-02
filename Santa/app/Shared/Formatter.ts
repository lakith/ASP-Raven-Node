interface String {
    format(replacements: string[]): string;
}
if (!String.prototype.format) {
    String.prototype.format = function() {
        let args = arguments;
        return this.replace(/{(\d+)}/g, function(match:any, number:any) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}