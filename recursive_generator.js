function System(name, subsystems, uri) {
    this.name = name;
    this.subsystems = subsystems;
    this.uri = uri;
}
var A = new System("A", [], "http://A");
var B1 = new System("B1", [], "http://B/B1");
var B21 = new System("B21", [], "http://B/B2/B21");
var B22 = new System("B22", [], "http://B/B2/B22");
var B2 = new System("B2", [B21, B22], "http://B/B2");
var B = new System("B", [B1, B2], "http://B");
var C1 = new System("C1", [], "http://C/C1");
var C = new System("C", [C1], "http://C/");
var S = new System("S", [A, B, C], "");

function* find_subsystem(system, name) {
	if(system.name == name) {
    	yield system.uri;
    }
    for (var i = 0; i < system.subsystems.length; i++) {
    	yield* find_subsystem(system.subsystems[i], name);
    }
}

console.log(find_subsystem(S, "B22").next().value);
