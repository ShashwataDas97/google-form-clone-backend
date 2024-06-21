### Step 1 : Download and Install Node.js and npm :
  1. Download and install 'Node.js' and 'npm'.
  2. Type 'cmd' and press Enter. This will open Command Prompt.
  3. Type the following command and press Enter to check 'Node.js' version :
     
	         node -v
  4. Type the following command and press Enter to check 'npm' version :
	        
           npm -v

### Step 2 : Initialize Node.js Project :
  1. Type 'cmd' and press Enter. This will open Command Prompt.
  2. In Command Prompt, use the 'mkdir' command followed by the name of your project directory. This command creates a directory named 'google-forms-clone-backend' in your current location. For example :
     
           mkdir google-forms-clone-backend
  3. Use the 'cd' command followed by the name of your directory 'google-forms-clone-backend' to move into it. Now you are inside the 'google-forms-clone-backend' directory where your Node.js project will reside.For example :
     
	        cd google-forms-clone-backend
  4. Use the 'npm init' command with the '-y' flag to generate a 'package.json' file with default values. This file is essential for Node.js projects as it contains metadata about your project and its dependencies.
     
	        npm init -y
 
### Step 3 : Install Dependencies :
  1. Use the 'npm install' command followed by the package names 'express' (a popular web framework for Node.js) and 'body-parser' (middleware for handling JSON and URL encoded form data) to install them as regular dependencies :
     
	        npm install express body-parser
  2. Use the 'npm install command with the '--save-dev' flag to install TypeScript ('typescript'), '@types/express' (type definitions for Express), '@types/node' (type definitions for Node.js core modules), 'ts-node' (TypeScript execution and REPL for Node.js), and 'nodemon' (a utility that monitors for changes and automatically restarts the server). The '--save-dev' flag ensures these packages are added as development dependencies in your 'package.json' file.
     
	        npm install --save-dev typescript @types/express @types/node ts-node nodemon

### Step 4 : Create TypeScript Configuration File :
  1. If you installed TypeScript, create a 'tsconfig.json' file in your project directory to configure TypeScript compilation options. You can initialize a basic 'tsconfig.json' file using the following command. This command generates a 'tsconfig.json' file with default settings.
     
	        npx tsc --init

 ### Step 5 : Configure 'tsconfig.json' file :
  1. Use code editor 'Visual Studio Code' to open and edit the 'tsconfig.json' file.
  2. Replace the contents of the 'tsconfig.json' file with the following configuration :
     
	        {
              "compilerOptions": {
                "target": "ES6",
                "module": "commonjs",
                "outDir": "./dist",
                "rootDir": "./src",
                "strict": true,
                "esModuleInterop": true
               }    
            }
  3. This configuration specifies the following :

           -> 'target' : The version of JavaScript to which TypeScript will compile. Here, it is set to 'ES6' (ECMAScript 2015).

           -> 'module' : The module system to use in the generated JavaScript files. Here, it is set to 'commonjs', which is used by Node.js.

           -> 'outDir' : The output directory for the compiled JavaScript files. Here, it is set to './dist'.

           -> 'rootDir' : The root directory of your TypeScript source files. Here, it is set to './src'.

           -> 'strict' : Enables strict type-checking options for improved code quality.

           -> 'esModuleInterop' : Enables compatibility with ES module imports.
  4. After making the changes, save the 'tsconfig.json' file and close the code editor 'Visual Studio Code'.

### Step 6 : Create Folders and Files for Project Structure :
  1. Type 'cmd' and press Enter. This will open Command Prompt.
  2. Use the 'cd' command to navigate into your 'google-forms-clone-backend' directory. For example :
     
	        cd google-forms-clone-backend
  3. Use the 'mkdir' command to create the 'src' directory. This is where your TypeScript source files will be located :
     
	        mkdir src
  4. Create the empty 'index.ts' file in the 'src' directory using the 'echo' command :
     
	        echo. > src\index.ts
  5. Create the empty 'db.json' file in the 'src' directory using the 'echo' command :
     
	        echo. > src\db.json

### Step 7 : Structure 'db.json' file :
  1. Use code editor 'Visual Studio Code' to open and edit the 'db.json' file.
  2. Edit 'db.json' file by adding the following JSON structure :
     
	        {
              "submissions": []
            }
  3. After making the changes, save the 'tsconfig.json' file and close the code editor 'Visual Studio Code'.

### Step 8 : Develop Backend Endpoints :
  1. Implement '/ping', '/submit', '/read', '/delete', '/update' and '/search' Endpoints. For this we have to add the code in the 'index.ts' file.
  2. Use code editor 'Visual Studio Code' to open and write code in the 'index.ts' file.
  3. Write the following code in the 'index.ts' file :
     
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
            
            app.get('/ping', (req: Request, res: Response) => {
              // Write logic for '/ping'
            });
            
            app.post('/submit', (req: Request, res: Response) => {
              // Write logic for '/submit'
            });
            
            app.get('/read', (req: Request, res: Response) => {
              // Write logic for '/read'
            });
            
            app.delete('/delete', (req: Request, res: Response) => {
              // Write logic for '/delete'
            });
            
            app.put('/update/:index', (req: Request, res: Response) => {
              // Write logic for '/update'
            });
            
            app.get('/search', (req: Request, res: Response) => {
              // Write logic for '/search'
            });
            
            app.listen(PORT, () => {
              console.log(`Server is running on http://localhost:${PORT}`);
            });
  4. For '/ping' -> A 'GET' request that always returns 'True'. This is the following code for this :
     
	        app.get('/ping', (req: Request, res: Response) => {
              res.json(true);
            });
  5. For '/submit' -> A 'POST' request with parameters "name", "email", "phone", "github_link" and "stopwatch_time". This is the following code for this :
     
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
  6. For '/read' -> A 'GET' request with query parameter "index" which is a 0-index for reading the (index+1)th form submission. This is the following code for this :
      
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
  7. For '/delete' -> A 'DELETE' request with query parameter "index" which is a 0-index for deleting the (index+1)th form submission. This is the following code for this :
      
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
  8. For '/update' -> A 'PUT' request with path parameter "index" which is a 0-index for editing the (index+1)th form submission. This is the following code for this :
      
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
  9. For '/search' --> A 'GET' request with query parameter "email" for searching from form submission. This is the following code for this :
      
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

### Step 9 : Develop Backend Endpoints :
  1. Type 'cmd' and press Enter. This will open Command Prompt.
  2. Use the 'cd' command to navigate into your 'google-forms-clone-backend' directory.
  3. Use the 'npx nodemon' command to start the server with automatic restarts on file changes :
     
	       npx nodemon src/index.ts   
