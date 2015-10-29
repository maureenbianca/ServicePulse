﻿namespace ServicePulse.Host.Commands
{
    using System.IO;
    using System.Text.RegularExpressions;
    using ServicePulse.Host.Hosting;

    class RemoveDeprecatedOveridesCommand : AbstractCommand
    {
        public override void Execute(HostArguments args)
        {
            DeleteAppJsFile(args);
        }

        static void DeleteAppJsFile(HostArguments args)
        {

            var directoryPath = args.OutputPath;

            var configPath = Path.Combine(directoryPath, "config.js");

            if (File.Exists(configPath))
            {
                MigrateServiceControlUrl(args, configPath);

                File.Delete(configPath);
            }

            var destinationPath = Path.Combine(directoryPath, "js\\app.js");

            if (File.Exists(destinationPath))
            {
                MigrateServiceControlUrl(args, destinationPath);
                File.Delete(destinationPath);
            }
        }

    
    }
}