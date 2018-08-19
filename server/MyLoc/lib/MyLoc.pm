package MyLoc;
use Dancer2;
use Db::Db;
use Data::Dumper;

our $VERSION = '0.1';
my  $db_test = Db::Db::get_db();

get '/' => sub {
    #Db::Db::create_table_users();
    #Db::Db::insert_into_users();
    #Db::Db::delete_from_users( 2 );
    
    #my $write = $db_test->{ 'insert' }();
    #return to_json [
    #    { one => $write, two => $write }, 
    #    { one => $write, two => $write }, 
    #    { one => $write, two => $write }, 
    #];
    "<h1>Home: Hello</h1>"
};

get '/users/all' => sub {
    my $users = Db::Db::fetch_users();

    header 'Access-Control-Allow-Origin' => '*';
    content_type 'application/json';
    return to_json $users;
};

get '/user/:id' => sub {
    my $id = route_parameters->get('id');
    my $user = Db::Db::get_one_users( $id );

    content_type 'application/json';
    return to_json $user;
};

get '/user/create/:username/:password/:name' => sub {
    my $username = route_parameters->get('username');
    my $password = route_parameters->get('password');
    my $name     = route_parameters->get('name');
    Db::Db::insert_one_user( $username, $password, $name );
    "$username == $password == $name"
};

get '/roll/update/:id/:role' => sub {
    my $id = route_parameters->get('id');
    my $role = route_parameters->get('role');
    Db::Db::update_users( $id, $role );

    content_type 'application/json';
    return to_json { $id => $role, message => 'successfully updated' };
};

get '/next/:tableName' => sub {
    my $table_name = route_parameters->get( 'tableName' );
    my $next_id = Db::Db::get_next_id( $table_name );
    content_type 'application/json';
    "$next_id"
};

true;
