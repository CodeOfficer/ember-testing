require('test/spec_helper');


describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });
});

integrationTest('integrationTest', function() {
  describe("A suite", function() {
    var todo1, todo2;

    console.log('TESTS ARE EXECUTING');

    it("contains spec with an expectation", function() {
      expect(true).toBe(true);
    });

    // assertFeedIsEmpty();

    describe("Another suite", function() {
      it("contains another spec with an expectation", function() {
        todo1 = Todos.Todo.createRecord({title: 'todo 1'});
        todo2 = Todos.Todo.createRecord({title: 'todo 2'});

        app(function() {
          Todos.__container__.lookup('controller:todos').pushObject(todo1);
          Todos.__container__.lookup('controller:filteredTodos').pushObject(todo2);
        });

        console.log('TESTS ARE EXECUTING??????????');
        expect(true).toBe(true);
      });
    });

    // assertInFeed(todo1);
    // assertInFeed(todo2);
    it("contains an integrationTest spec", function() {
      expect(true).toBe(true);
    });
  });
});
