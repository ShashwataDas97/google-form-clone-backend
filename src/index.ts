import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3000;
const dbFilePath = path.join(__dirname, 'db.json');

app.use(bodyParser.json());

// Initialize db.json if it doesn't exist
const initializeDb = () => {
  if (!fs.existsSync(dbFilePath)) {
    fs.writeFileSync(dbFilePath, JSON.stringify({ submissions: [] }, null, 2));
  }
};

// Middleware to initialize db.json
initializeDb();

// Health check endpoint
app.get('/ping', (req: Request, res: Response) => {
  res.json(true);
});

// Endpoint to submit a new submission
app.post('/submit', (req: Request, res: Response) => {
  const { name, email, phone, github_link, stopwatch_time } = req.body;
  const newSubmission = { name, email, phone, github_link, stopwatch_time };

  try {
    let db = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
    db.submissions.push(newSubmission);
    fs.writeFileSync(dbFilePath, JSON.stringify(db, null, 2));
    res.json({ success: true });
  } catch (err) {
    console.error('Error handling submission:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to read a specific submission by index
app.get('/read', (req: Request, res: Response) => {
  const index = parseInt(req.query.index as string, 10);
  try {
    let db = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
    // console.log('DB Content : ',db);
    if (index >= 0 && index < db.submissions.length) {
      res.json(db.submissions[index]);
    } else {
      res.status(404).json({ error: 'Submission not found' });
    }
  } catch (err) {
    console.error('Error reading submissions:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to delete a specific submission by index
app.delete('/delete', (req: Request, res: Response) => {
  const index = parseInt(req.query.index as string, 10);
  try {
    let db = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
    if (index >= 0 && index < db.submissions.length) {
      db.submissions.splice(index, 1);
      fs.writeFileSync(dbFilePath, JSON.stringify(db, null, 2));
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Submission not found' });
    }
  } catch (err) {
    console.error('Error deleting submission:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to update a specific submission by index
app.put('/update/:index', (req: Request, res: Response) => {
  const index = parseInt(req.params.index, 10);
  const { name, email, phone, github_link, stopwatch_time } = req.body;
  const updatedSubmission = { name, email, phone, github_link, stopwatch_time };

  try {
    let db = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
    if (index >= 0 && index < db.submissions.length) {
      db.submissions[index] = updatedSubmission;
      fs.writeFileSync(dbFilePath, JSON.stringify(db, null, 2));
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Submission not found' });
    }
  } catch (err) {
    console.error('Error updating submission:', err);
    res.status(500).json({ error: 'Internal server error' });   
  }
});

// Endpoint to search for a submission by email
app.get('/search', (req: Request, res: Response) => {
  const email = req.query.email as string;
  try {
    let db = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
    const submission = db.submissions.find((submission: { email: string }) => submission.email === email);
    if (submission) {
      res.json(submission);
    } else {
      res.status(404).json({ error: 'Submission not found' });
    }
  } catch (err) {
    console.error('Error searching submission:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});