export class Config{
	static MAIN_HEADING: string = " | Linux Command Builder | "
	//static dataObject: Object = {"linuxCategories":[{"add":[{"directory":"mkdir"},{"directory1":"mkdir"},{"directory2":"mkdir"}]},{"delete":"object"},{"modify":"object"},{"view":"object"},{"locate":"object"},{"copy":"object"}]};

	static dataObject: Object = {"linuxCategories":[["mkdir","touch","user add"],["rmdir","n/a","rm","n/a"],[["chmod OR chown","chmod OR chown"],["rename","nano OR vim","n/a"]],["ls","tail","cat","All processes"],["ps aux"],["SCP"]]};

	static categoriesSearch: string = `Add.Delete.Modify.View.Locate.Copy`;
	static addSearch: string = `Directory.File.User`;
	static deleteSearch: string = `directory.application.file.user`;
	static modifySearch: string = `permissions.file`;
	static modifyPermissionsSubSearch: string = `file.directory`;
	static modifyFileSubSearch: string = `name.contents.date`;
	static viewSearch: string = `directory.logfile.file.allprocesses`;
	static locateSearch: string = `file.process.currentlocation.users`;
	static copySearch: string = `scp`;

}