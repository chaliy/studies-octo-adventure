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

var CoursesStore = require('../../stores/courses-store').CoursesStore;
var EditCourse = require('./edit-course').EditCourse;

var Courses = React.createClass({

  getInitialState: function(){
    return {
      courses: CoursesStore.getCourses()
    };
  },

  componentDidMount: function() {
    CoursesStore.addChangeListener(this._onStoreChange);
  },

  componentWillUnmount: function() {
     CoursesStore.removeChangeListener(this._onStoreChange);
  },

  render: function() {

    var owner = this;

    var columnMetadata = [
      {
        columnName: 'title',
        displayName: 'Назва курсу'
      },
      {
        columnName: '_id',
        displayName: '',
        customComponent: React.createClass({
          render: function(){
            this.modal = <EditCourse
                            _id={this.props.rowData._id}
                            title={this.props.rowData.title}
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

    var columnsToShow = ['title', '_id'];

    return <div>
      <h2>Перелік всіх курсів</h2>
      <Panel>
        <ButtonGroup>
          <ModalTrigger modal={<EditCourse onSubmit={this._handleAddSubmit} onRequestHide={this._handleEditCancel} />}>
            <Button bsStyle='primary'>Add</Button>
          </ModalTrigger>
        </ButtonGroup>
      </Panel>
      <Griddle results={this.state.courses} columnMetadata={columnMetadata} columns={columnsToShow} resultsPerPage={60} useFixedLayout={false} />
    </div>;
  },

  _handleEditCancel: function(e){
  },

  _handleAddSubmit: function(data){
    CoursesStore.add(data);
  },

  _handleUpdateSubmit: function(id, data){
    CoursesStore.update(id, data);
  },

  _handleRemoveSubmit: function(id){
    CoursesStore.remove(id);
  },

  _onStoreChange: function(){
    this.setState({
      courses: CoursesStore.getCourses()
    });
  }
});

exports.Courses = Courses;
