QuoraTest = function() {};

QuoraTest.prototype.SIZE = 0.5;
QuoraTest.prototype.SHELLS = 10;
QuoraTest.prototype.NAME = "QuoraTest";
QuoraTest.prototype.POSITION = { x: 512, y: 512.5, z: 518 };
QuoraTest.prototype.COLOR = { red: 220, green: 220, blue: 220 };
QuoraTest.prototype.USER_DATA = {
    ProceduralEntity: {
        version: 2,
        shaderUrl: "https://s3.amazonaws.com/Oculus/shadertoys/quora2.fs",
        uniforms: { iSpeed: 1.0, iShell: 1.0 }
    }
};

QuoraTest.prototype.clear = function() {
    var ids = Entities.findEntities(MyAvatar.position, 50);
    var that = this;
    ids.forEach(function(id) {
        var properties = Entities.getEntityProperties(id);
        if (properties.name == that.NAME) {
            Entities.deleteEntity(id);
        }
    }, this);
}

QuoraTest.prototype.create = function() {
    var intensity = 1.0 / (this.SHELLS + 1);
    var increment = this.SIZE * intensity;
    for (var i = 0; i < this.SHELLS; ++i) {
        var size = this.SIZE - i * increment;
        var userData = this.USER_DATA;
        this.USER_DATA.ProceduralEntity.uniforms.iShell = 1.0 - i * intensity;
        var id = Entities.addEntity({
            type: "Sphere",
            position: this.POSITION,
            name: this.NAME,
            color: this.COLOR,
            ignoreCollisions: true,
            collisionsWillMove: false,
            dimensions: { x: size, y: size, z: size },
            userData: JSON.stringify(userData)
        });
    }
}

var quoraTest = new QuoraTest();
quoraTest.clear();
quoraTest.create();