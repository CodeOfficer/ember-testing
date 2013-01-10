require('test/spec_helper');


describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });

  it("contains spec with another expectation", function() {
    expect(true).toBe(true);
  });
});

integrationTest('integrationTest', function() {
  describe("A suite", function() {
    var todo1, todo2;

    beforeEach(function(){
      console.log('EXECUTING??? 1');
    });

    it("contains spec with an expectation", function() {
      console.log('EXECUTING??? 2');
      expect(true).toBe(true);
    });

    describe("Another suite", function() {
      console.log('EXECUTING??? 3');

      it("contains another spec with an expectation", function() {
        console.log('EXECUTING??? 4');
        todo1 = Todos.Todo.createRecord({title: 'todo 1'});
        todo2 = Todos.Todo.createRecord({title: 'todo 2'});

        app(function() {
          Todos.__container__.lookup('controller:todos').pushObject(todo1);
          Todos.__container__.lookup('controller:filteredTodos').pushObject(todo2);
        });

        console.log('EXECUTING??? 5');
        expect(true).toBe(true);
      });
    });
  });
}, this);
