import User from './user';
import Task from './task';

// Define associations
User.hasMany(Task, {
    foreignKey: 'userId',
    as: 'tasks',
});

Task.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

export {
    User,
    Task,
};