import bcrypt from 'bcryptjs';
import { DataTypes } from 'sequelize';

export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        googleId: {
            type: DataTypes.STRING(255),
            unique: true,
            allowNull: true
        },
        profileURL: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        firstName: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        lastName: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true,
            unique: true,
            validate: { isEmail: true }
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        role: {
            type: DataTypes.ENUM('admin', 'user'),
            allowNull: false,
            defaultValue: 'user'
        },
        passwordResetToken: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        passwordResetExpires: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        emailVerificationToken: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        emailVerificationExpires: {
            type: DataTypes.DATE,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('unverified', 'verified', 'deleted'),
            allowNull: false,
            defaultValue: 'unverified'
        }
        }, {
            tableName: 'User'
        });

    // Hash password before create
    User.beforeCreate(async (user) => {
        if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
    });

    // Hash password before update if changed
    User.beforeUpdate(async (user) => {
        if (user.changed('password')) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
    });

    // compare passwords
    User.prototype.comparePassword = async function(candidatePassword) {
        return await bcrypt.compare(candidatePassword, this.password);
    };

    return User;

};