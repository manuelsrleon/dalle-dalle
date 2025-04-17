import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { createScenarioTable } from './db_schema';
import { testScenario1 } from './test_scenario.sql';
import Scenario from '../common/model/scenario/scenario';
import ChallengeData from '../common/model/scenario/challenge-data';
import FailureData from '../common/model/scenario/failure-data';
import SuccessData from '../common/model/scenario/success-data';


const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('userData');

db.serialize(() => {
  console.log("Attempting to create SCENARIO table:")
  console.log(createScenarioTable);
  db.run(createScenarioTable);
  
  console.log("Attempting to insert SCENARIO test data:")
  console.log(testScenario1);
  const stmt = db.prepare(testScenario1);
  stmt.run()
  stmt.finalize();

  db.each("SELECT * from SCENARIO", (err, row) => 
    console.log(row)
  )
});

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  const homeDir = app.getPath('home');

  console.log(homeDir);

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  ipcMain.handle('load-saved-scenarios', async (event, args) => {
  
    
    const savedScenarios = await new Promise<any[]>((resolve,reject) => {
      db.all("SELECT rowid, * from SCENARIO ", (err, rows) => {

        if(err){
          reject(err);
        }else{
          resolve(rows);
        }
      });
    })
    return savedScenarios;

  });

  ipcMain.handle('load-scenario', async (event, args) => {
    
    let scenarioId = args['scenarioId'];

    const scenarioQR = await db.get(`SELECT rowid, * from SCENARIO where rowid = ${scenarioId}`);

    return scenarioQueryResultToScenarioMapper(scenarioQR);
  })
  
  type ScenarioQueryResult = {
    rowid: string;
    type: string;
    title: string;
    subtitle: string;
    challenge_prompt: string;
    challenge_mediaPath: string;
    challenge_maxTime: number;
    challenge_rfidObjectCode: string;
    success_text: string;
    success_mediaPath: string;
    success_soundPath: string;
    failure_text: string;
    failure_mediaPath: string;
    failure_soundPath: string;
  }

  const scenarioQueryResultToScenarioMapper = async (scenarioQueryResult: ScenarioQueryResult) => {
    let mappedScenario: Scenario = {} as Scenario;
    mappedScenario = {
      id: scenarioQueryResult.rowid,
      type: scenarioQueryResult.type,
      title: scenarioQueryResult.title,
      subtitle: scenarioQueryResult.subtitle,
      challenge: {
        prompt: scenarioQueryResult.challenge_prompt,
        mediaPath: scenarioQueryResult.challenge_mediaPath,
        soundPath: scenarioQueryResult.success_soundPath,
        maxTime: scenarioQueryResult.challenge_maxTime,
        rfidObjectCode: scenarioQueryResult.challenge_rfidObjectCode
      } as ChallengeData,
      successData: {
        text: scenarioQueryResult.success_text,
        mediaPath: scenarioQueryResult.success_mediaPath,
        soundPath: scenarioQueryResult.success_soundPath
      } as SuccessData,
      failureData: {
        text: scenarioQueryResult.failure_text,
        mediaPath: scenarioQueryResult.failure_mediaPath,
        soundPath: scenarioQueryResult.failure_soundPath
      } as FailureData,
      settings: undefined
    }
    console.log(mappedScenario);
    return mappedScenario;
  }
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  db.close();
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
