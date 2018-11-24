

export default abstract class BaseCommand {
    abstract run(args: { [key: string]: any }): void;
}
