var assign = Object.assign || require('object-assign');
var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Button = ReactBootstrap.Button;
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var ButtonGroup = ReactBootstrap.ButtonGroup;
var ModalTrigger = ReactBootstrap.ModalTrigger;
var DropdownButton = ReactBootstrap.DropdownButton;
var MenuItem = ReactBootstrap.MenuItem;
var Panel = ReactBootstrap.Panel;
var Glyphicon = ReactBootstrap.Glyphicon;
var Griddle = require('griddle-react');

var EmployeesStore = require('../../stores/employees-store').EmployeesStore;
var EditEmployee = require('./edit-employee').EditEmployee;

var Employees = React.createClass({

  getInitialState: function(){
    return {
      employees: EmployeesStore.getEmployees()
    };
  },

  componentDidMount: function() {
    EmployeesStore.addChangeListener(this._onStoreChange);
  },

  componentWillUnmount: function() {
     EmployeesStore.removeChangeListener(this._onStoreChange);
  },

  render: function() {

    var owner = this;

    var columnMetadata = [
      {
        columnName: 'fullName',
        displayName: 'Ім\'я'
      },
      {
        columnName: '_id',
        displayName: '',
        customComponent: React.createClass({
          render: function(){
            this.modal = <EditEmployee
                            _id={this.props.rowData._id}
                            fullName={this.props.rowData.fullName}
                            onSubmit={this._handleSubmitClick}
                            onRequestHide={owner._handleEditCancel}
                            />;

            return <ButtonGroup>
              <ModalTrigger modal={this.modal}>
                <Button bsStyle='primary'><Glyphicon glyph='edit' /></Button>
              </ModalTrigger>
              <Button onClick={this._handleRemoveClick}><Glyphicon glyph='remove' /></Button>
            </ButtonGroup>
          },
          _handleRemoveClick: function(e){
            owner._handleRemoveSubmit(this.props.rowData._id);
          },
          _handleSubmitClick: function(data){
            owner._handleUpdateSubmit(this.props.rowData._id, data);
          },
        })
      }
    ];

    var columnsToShow = ['fullName', '_id'];

    return <div>
      <h2>Співробітники</h2>
      <Panel>
        <ButtonGroup>
          <ModalTrigger modal={<EditEmployee onSubmit={this._handleAddSubmit} onRequestHide={this._handleEditCancel} />}>
            <Button bsStyle='primary'>Add</Button>
          </ModalTrigger>
        </ButtonGroup>
      </Panel>
      <Griddle results={this.state.employees} columnMetadata={columnMetadata} columns={columnsToShow} resultsPerPage={60} useFixedLayout={false} />
    </div>;
  },

  _handleEditCancel: function(e){
  },

  _handleAddSubmit: function(data){
    EmployeesStore.add(data);
  },

  _handleUpdateSubmit: function(id, data){
    EmployeesStore.update(id, data);
  },

  _handleRemoveSubmit: function(id){
    EmployeesStore.remove(id);
  },

  _onStoreChange: function(){
    this.setState({
      employees: EmployeesStore.getEmployees()
    });
  }
});

exports.Employees = Employees;
