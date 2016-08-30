var Comment = React.createClass({

    getInitialState: function() {
        return {editing: false}
    },
    Edit: function() {
        this.setState({editing: true})
       // console.log('edit')

    },
    Remove: function() {
       // console.log('Remove');
        this.props.DeleteComment(this.props.index);
    },
    renderForm: function() {
        return (
            <div className="EditComment">
                <textarea ref="newText" defaultValue={this.props.children}></textarea>
                <button className="buttonContainer save" onClick={this.Save}>Save</button>
            </div>
        )
    },
    rendernormal: function() {
        return(
            <div className="CommentContainer">
                <p>{this.props.children}</p>
                <button className="buttonContainer edit" onClick={this.Edit}>Edit</button>
                <button className="buttonContainer remove" onClick={this.Remove}>Remove</button>
            </div>

        );
    },
    Save: function() {
        var val = this.refs.newText.value;
      //  console.log('value: ', val);
        this.props.UpdateComment(val, this.props.index);
        this.setState({editing: false})
    },
    render: function() {
        if (this.state.editing) {
            return this.renderForm()
        }
        else {
            return this.rendernormal()
        }
    }

});

var Board = React.createClass({
    getInitialState: function() {
        return {
            comments:[]
        }
    },
    removeComment: function(i) {
        var arr = this.state.comments;
        arr.splice(i,1);
       // console.log('index is: ', i, 'array: ', arr);
        this.setState({comments: arr});

    },
    UpdateComment: function(newText, i) {
        var arr = this.state.comments;
        arr[i] = newText;
        console.log('updating ',arr);
        this.setState({comments: arr});
    },
    eachComment: function(text, i) {

          return (
              <Comment key={i} index={i} DeleteComment={this.removeComment} UpdateComment={this.UpdateComment}>{text}</Comment>
      );
    },
    AddComment: function (text) {
            var arr = this.state.comments;
            //var text = "Edit me " + (arr.length+1);
            arr.push(text);
            this.setState({comments : arr});
    },

    render: function() {
        return (
            <div className="Board">
                <button className="buttonContainer" onClick={this.AddComment.bind(null,'default text')}>Add New</button>
                {this.state.comments.map(this.eachComment)}

            </div>
        )
    }
});



ReactDOM.render(
<Board></Board>
    , document.getElementById("root"));
//alert("working");


