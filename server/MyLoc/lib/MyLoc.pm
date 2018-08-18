package MyLoc;
use Dancer2;
use Db::Db;
use Data::Dumper;

our $VERSION = '0.1';
my  $db_test = Db::Db::get_db();

get '/' => sub {
    #Db::Db::create_table_users();
    my $users = Db::Db::print_users();
    #Db::Db::insert_into_users();
    #Db::Db::update_users();
    #Db::Db::delete_from_users( 2 );
    #my $users = Db::Db::get_one_users();
    
    #my $write = $db_test->{ 'insert' }();
    #return to_json [
    #    { one => $write, two => $write }, 
    #    { one => $write, two => $write }, 
    #    { one => $write, two => $write }, 
    #];
    
    content_type 'application/json';
    return to_json $users;
};

true;
