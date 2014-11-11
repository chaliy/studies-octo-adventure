namespace SolidDip.Infrastructure
{
    using System;
    using System.Configuration;
    using System.Data.Common;
    using System.Data.SQLite;
    using System.IO;
    using System.Reflection;

    public static class Db
    {
        public static void Reset()
        {
            var fileName = GetFileName();
            if (File.Exists(fileName))
            {
                File.Delete(fileName);
            }
        }
        private static DbConnection CreateDbConnection()
        {
            var connectionStringSettings = ConfigurationManager.ConnectionStrings["StatsConnection"];
            var connectionString = (connectionStringSettings == null || String.IsNullOrWhiteSpace(connectionStringSettings.ConnectionString))
                ? "Data Source='" + GetFileName() + "';Version=3;"
                : connectionStringSettings.ConnectionString;
            var connection = new SQLiteConnection(connectionString);
            connection.Open();
            return connection;
        }

        private static string GetFileName()
        {
            var folderPath = Path.GetDirectoryName(
                Assembly.GetExecutingAssembly().Location
            );

            return Path.Combine(folderPath, "sd.db3");
        }

        public static void Run(Action<DbConnection> action)
        {
            using (var connection = CreateDbConnection())
            {
                action(connection);
            }
        }

        public static T Run<T>(Func<DbConnection, T> action)
        {
            using (var connection = CreateDbConnection())
            {
                return action(connection);
            }
        }
    }
}
