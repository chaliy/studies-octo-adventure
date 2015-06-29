/* jshint esnext: true */
var React = require('react');
var assert = require('assert');

var Step = React.createClass({

  componentDidMount: function() {
    var node = this.refs.play.getDOMNode();
    var viewer = new Viewer(this.props.polygons, 250, 250, 5);
    node.appendChild(viewer.gl.canvas);
  },

  render: function(){
    return <div>
      <p>{this.props.description}</p>
      <div ref='play'></div>
    </div>;
  }
});

var Steps = React.createClass({
  render: function(){
    return <table><tr>
      {
        this.props.children.map(function(c, i){
          return <td key={i}>{c}</td>
        })
      }
    </tr></table>
  }
});

var K2B = React.createClass({



  rednerSteps: function*(){

    yield <h2>Ящик для розсортованого зерна</h2>;

    var boxBase = CSG.cube({radius: [1, 0.8, 1]});
    var boxInternal = CSG.cube({radius: [0.99, 0.79, 0.99], center:[0.0, 0.1, 0]});
    var box = boxBase.subtract(boxInternal);

    yield <Steps>
      <Step description='База: A' polygons={boxBase} />
      <Step description='Середина' polygons={boxInternal} />
      <Step description='Віднімаємо середину: A\B' polygons={box} />
    </Steps>;


    yield <h2>Лоток</h2>;

    var trayBase = CSG.cube({radius: [1, 0.2, 1.3]});
    var trayInternal = CSG.cube({radius: [0.99, 0.19, 1.3], center:[0.0, 0.1, 0]});
    var tray = trayBase.subtract(trayInternal);

    yield <Steps>
      <Step description='База: A' polygons={trayBase} />
      <Step description='Середина' polygons={trayInternal} />
      <Step description='Віднімаємо середину: A\B' polygons={tray} />
    </Steps>;

    yield <h2>Бункер для зерна</h2>;

    var tankBase = CSG.cube({radius: [1, 0.8, 1]});
    var tank = tankBase
      .subtract( // Внутрішню частину
        CSG.cube({radius: [0.99, 0.79, 0.99], center:[0.0, 0.1, 0]})
      )
      .subtract( // Дірку в верхній частині
        CSG.cylinder({
          start: [0, -2, 0],
          end: [0, 2, 0],
          radius: 0.5
        })
      );

    var tankNeckBase = CSG.cylinder({
        start: [0, -0.5, 0],
        end: [0, -1.5, 0],
        radius: 0.5
      });

    var tankNeck = tankNeckBase.subtract(
      CSG.cylinder({
          start: [0, -0.5, 0],
          end: [0, -1.5, 0],
          radius: 0.49
        })
    );

    var tankAssembly = tank.union(tankNeck);

    yield <Steps>
      <Step description='Верхня частина: A' polygons={tank} />
      <Step description='Гроловина: B' polygons={tankNeck} />
      <Step description='Зборка: A∪B' polygons={tankAssembly} />
    </Steps>;

  },

  render: function() {
    return <div>{Array.from(this.rednerSteps())}</div>;
  },
});

exports.K2B = K2B;
