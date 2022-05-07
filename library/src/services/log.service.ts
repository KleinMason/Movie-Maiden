export interface ILogService {
    logCommand(command: string);
}

export class LogService implements ILogService {
    logCommand = (command: string) => {
        console.info(`command: ${command}`);
    }
}