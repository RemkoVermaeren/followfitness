var mongoose = require('mongoose');

var TrainingSchema = new mongoose.Schema({
    name: String,
    description: String,
    date: Date,
    exercises: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise'
    }],
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isCompleted : {type : Boolean, default: false}
});

TrainingSchema.methods.reverseIsCompleted = function (tr){
    this.isCompleted = !this.isCompleted;
    this.save(tr);
};

mongoose.model('Training', TrainingSchema);
