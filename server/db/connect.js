import mongoose from 'mongoose';
import chalk from 'chalk';
import dotenv from 'dotenv';

const { connect, connection } = mongoose;
dotenv.config();

const beginConnection = async () => {
  try {
    connect(process.env.DATABASE_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (error) {
    console.error(chalk.red(`Error ====> ${error.message}`));
    process.emit('SIGINT');
  }
};
connection.on('connected', () => console.log(chalk.blue('Mongoose connected')));
connection.on('disconnected', () => console.log(chalk.blue('Mongoose disconnected')));
process.on('SIGINT', () => {
  connection.close(() => {
    console.log(chalk.blue('Mongoose terminated through app termination'));
    process.exit(0);
  });
  beginConnection();
});

export default beginConnection;
