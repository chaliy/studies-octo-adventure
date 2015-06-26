var assert = require('assert');
var assign = Object.assign || require('object-assign');
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;

var URL = process.env.DB || 'mongodb://localhost:27017/sasv';

var _connect = function(cb){
  MongoClient.connect(URL, function(err, db) {
    assert.equal(err, null);

    cb(null, db);
  });
};

var _markUpdated = function(item){
  return assign(item, {
    updatedAt: new Date()
  });
};

var dal = function(n){

  return {

    collection: function(cb){
      _connect(function(err, con){
        assert.equal(err, null);

        cb(null, con.collection(n), function(){

          con.close();
        });
      });
    },

    all: function(filter, cb){

      this.collection(function(err, collection, close){
        assert.equal(err, null);

        var c = collection.find(filter || {});

        c.toArray(function(err, items){
          assert.equal(err, null);
          close();

          cb(null, items);
        });
      });
    },

    /*
    * Додати запис в базу данних
    *  - Відкривається підключення в БД
    *  - Оновлюється поле updatedAt з поточним ервеним часом
    *  - Зберігається забис
    */
    add: function(item, cb){
      this.collection(function(err, collection, close){
        assert.equal(err, null);

        var updatedItem = _markUpdated(item);
        collection.insert(updatedItem, function(err, result){
          assert.equal(err, null);
          close();

          cb(null, result);
        });
      });
    },

    update: function(id, patch, cb){

      this.collection(function(err, collection, close){
        assert.equal(err, null);

        var updatedItem = _markUpdated(patch);

        collection.update({_id: mongo.ObjectID(id)}, {$set: updatedItem}, function(err, result){
          assert.equal(err, null);
          close();

          cb(null, result);
        });
      });
    },

    remove: function(id, cb){

      this.collection(function(err, collection, close){
        assert.equal(err, null);

        collection.remove({_id: mongo.ObjectID(id)}, function(err, result){
          assert.equal(err, null);
          close();

          cb(err, result);
        });
      });
    },

    merge: function(filter, patch, cb){

      this.collection(function(err, collection, close){
        assert.equal(err, null);

        var updatedItem = _markUpdated(patch);

        collection.update(filter, {$set: updatedItem},
          function(err, result){
            assert.equal(err, null);

            if (result.result.n === 1){
              // Запис оновився отже існує, повертаємось
              close();

              cb(null, result);
            } else {
              // Запису по фільтру немає, отже додаємо

              collection.insert(assign(updatedItem, filter), function(err, result){
                assert.equal(err, null);

                close();
                cb(null, result);
              });
            }
          });


      });
    },
  };
};

module.exports.EmployeesDataAccess = dal('employees');
module.exports.CoursesDataAccess = dal('courses');

module.exports.ObjectID = mongo.ObjectID;
module.exports.ISODate = mongo.ISODate;
