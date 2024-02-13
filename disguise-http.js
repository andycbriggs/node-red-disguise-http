module.exports = function (RED) {
    function ExtractSystemNode(config) {
        RED.nodes.createNode(this, config);
        this.hostname = config.hostname;
        var node = this;

        node.on('input', function (msg) {
            const payload = msg.payload;
            if (payload && payload.result && Array.isArray(payload.result)) {
                for (let result of payload.result) {
                    if (result.hostname == node.hostname) {
                        msg.payload = result;
                        node.send(msg);
                        return;
                    }
                }
                node.error("Machine not found", msg);
            }
            else {
                node.error("Bad response", msg);
            }
        });
    }
    RED.nodes.registerType("extract-system", ExtractSystemNode);

    function ExtractHealthNode(config) {
        RED.nodes.createNode(this, config);
        this.hostname = config.hostname;
        var node = this;

        node.on('input', function (msg) {
            const payload = msg.payload;
            if (payload && payload.result && Array.isArray(payload.result)) {
                for (let result of payload.result) {
                    if (result.machine.hostname == node.hostname) {
                        msg.payload = result;
                        node.send(msg);
                        return;
                    }
                }
                node.error("Machine not found", msg);
            }
            else {
                node.error("Bad response", msg);
            }
        });
    }
    RED.nodes.registerType("extract-health", ExtractHealthNode);

    function ExtractHealthStateNode(config) {
        RED.nodes.createNode(this, config);
        this.stateName = config.stateName;
        var node = this;

        node.on('input', function (msg) {
            const payload = msg.payload;
            if (payload && payload.status.states && Array.isArray(payload.status.states)) {
                for (let state of payload.status.states) {
                    if (state.name == node.stateName) {
                        msg.payload = state;
                        node.send(msg);
                        return;
                    }
                }
                node.error("Machine not found", msg);
            }
            else {
                node.error("Bad response", msg);
            }
        });
    }
    RED.nodes.registerType("extract-health-state", ExtractHealthStateNode);
};


