if [ -z "$1" ]; then
    echo "Usage: bash run_plsql.sh <sql-file>"
    exit 1
fi


DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"


JAR_PATH=$(find "$DIR" -name "mysql-connector-j-*.jar" -o -name "mysql-connector-java-*.jar" 2>/dev/null | head -n 1)

if [ -z "$JAR_PATH" ] || [ ! -f "$JAR_PATH" ]; then
    echo "Error: MySQL Connector/J JAR (mysql-connector-j-*.jar) not found."
    echo "Please download the MySQL JDBC driver jar and place it in the PLSQL_Exercises folder."
    exit 1
fi


if [ ! -f "$DIR/PLSQLRunner.class" ] || [ "$DIR/PLSQLRunner.java" -nt "$DIR/PLSQLRunner.class" ]; then
    javac -cp "$JAR_PATH" "$DIR/PLSQLRunner.java"
fi


java -cp "$DIR:$JAR_PATH" PLSQLRunner "$1"
