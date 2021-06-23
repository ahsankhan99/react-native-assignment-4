import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Card,
  CardItem,
  Icon,
  Button,
  Header,
  Item,
} from 'native-base';

const UsersListScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((responseJson) => {
        setLoading(false);
        setUsers(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <Container>
      <Content>
        <List>
          {users.map((item) => (
            <ListItem
              key={item.id}
              onPress={() =>
                navigation.navigate('Bottom Navigation', { user: item })
              }
              avatar>
              <Left>
                <Thumbnail
                  source={{
                    uri: 'https://source.unsplash.com/random/' + item.id,
                  }}
                />
              </Left>
              <Body>
                <Text style={{ fontWeight: 'bold', marginBottom: '1%' }}>
                  {item.name}
                </Text>
                <Text note style={{ fontSize:14, color: 'gray',  marginBottom: '5%'  }}>
                  {item.email}
                </Text>
              </Body>
              <Right style={{ justifyContent: 'center' }}>
                <AntDesign name="right" size={16} color="black" />
              </Right>
            </ListItem>
          ))}
        </List>
      </Content>
      <StatusBar style="light" />
    </Container>
  );
};

const Profile = ({ route, navigation }) => {
  const { user } = route.params;

  return (
    <Container>
      <Content padder>
        <Card>
          <CardItem style={{ backgroundColor: '#212121' }}>
            <Thumbnail
              style={{ marginRight: '8%' }}
              large
              source={{ uri: 'https://source.unsplash.com/random/' + user.id }}
            />
            <Body>
              <Text
                style={{
                  fontSize: 18,
                  marginTop: '2%',
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                {user.name}
              </Text>
              <Text note style={{ color: '#38abf2' }}>
                @{user.username}
              </Text>
            </Body>
          </CardItem>
          <CardItem style={{ backgroundColor: '#262626', marginTop: 2 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>
              Contact Information:
            </Text>
          </CardItem>

          <CardItem style={{ backgroundColor: '#262626', marginTop: 1 }}>
            <Body>
              <Text style={styles.textStyle}>
                <Text style={{ fontWeight: 'bold', color: 'white' }}>
                  Email:{' '}
                </Text>
                {user.email}
              </Text>
              <Text style={styles.textStyle}>
                <Text style={{ fontWeight: 'bold' }}>Phone: </Text>
                {user.phone}
              </Text>
              <Text style={styles.textStyle}>
                <Text style={{ fontWeight: 'bold' }}>Website: </Text>
                {user.website}
              </Text>
            </Body>
          </CardItem>

          <CardItem style={{ backgroundColor: '#262626', marginTop: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>
              Address:
            </Text>
          </CardItem>
          <CardItem style={{ backgroundColor: '#262626', marginTop: 1 }}>
            <Body>
              <Text style={styles.textStyle}>
                <Text style={{ fontWeight: 'bold' }}>Street: </Text>
                {user.address.street}
              </Text>
              <Text style={styles.textStyle}>
                <Text style={{ fontWeight: 'bold' }}>Suite: </Text>
                {user.address.suite}
              </Text>
              <Text style={styles.textStyle}>
                <Text style={{ fontWeight: 'bold' }}>City: </Text>
                {user.address.city}
              </Text>
              <Text style={styles.textStyle}>
                <Text style={{ fontWeight: 'bold' }}>Zipcode:</Text>{' '}
                {user.address.zipcode}
              </Text>
              <Text style={styles.textStyle}>
                <Text style={{ fontWeight: 'bold' }}>Latitude:</Text>{' '}
                {user.address.geo.lat}
              </Text>
              <Text style={styles.textStyle}>
                <Text style={{ fontWeight: 'bold' }}>Longitude:</Text>{' '}
                {user.address.geo.lng}
              </Text>
            </Body>
          </CardItem>

          <CardItem style={{ backgroundColor: '#262626', marginTop: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>
              Company Details:
            </Text>
          </CardItem>

          <CardItem style={{ backgroundColor: '#262626', marginTop: 1 }}>
            <Body>
              <Text style={styles.textStyle}>
                <Text style={{ fontWeight: 'bold' }}>Name:</Text>{' '}
                {user.company.name}
              </Text>
              <Text style={styles.textStyle}>
                <Text style={{ fontWeight: 'bold' }}>Catchphrase: </Text>
                {user.company.catchPhrase}
              </Text>
              <Text style={styles.textStyle}>
                <Text style={{ fontWeight: 'bold' }}>BS: </Text>
                {user.company.bs}
              </Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

const Albums = ({ route, navigation }) => {
  const { user } = route.params;
  const [data, setData] = React.useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/albums`)
      .then((response) => response.json())
      .then((responseJson) => {
        setLoading(false);
        setData(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <Container>
      <Content>
        <List>
          {data.map((item) => (
            <ListItem
              key={item.id}
              onPress={() => navigation.navigate('Photos', {album: item })}>
              <Body style={{ justifyContent: 'center' }}>
                <Text
                  style={{ fontWeight: 'bold', padding: '2%', fontSize: 16 }}>
                  {item.title}
                </Text>
              </Body>
              <Right style={{ justifyContent: 'center' }}>
                <AntDesign name="right" size={16} color="black" />
              </Right>
            </ListItem>
          ))}
        </List>
      </Content>
    </Container>
  );
};

const Photos = ({ route, navigation }) => {
  const { album } = route.params;
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/albums/${album.id}/photos`)
      .then((response) => response.json())
      .then((responseJson) => {
        setLoading(false);
        setData(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <Container>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            thumbnail
            onPress={() => navigation.navigate('Picture', { url: item.url })}>
            <Left>
              <Thumbnail square source={{ uri: item.thumbnailUrl }} />
            </Left>
            <Body style={{ justifyContent: 'center' }}>
              <Text style={{ paddingVertical: '3%' }}>{item.title}</Text>
            </Body>
            <Right>
              <AntDesign name="right" size={16} color="black" />
            </Right>
          </ListItem>
        )}
      />
    </Container>
  );
};

const Picture = ({ route, navigation }) => {
  const { url } = route.params;

  return (
    <View style={styles.container}>
      <Image
        style={{
          height: '60%',
          width: '90%',
          marginTop: '15%',
          borderRadius: 5,
        }}
        source={{ uri: url }}
      />
    </View>
  );
};

const PostsList = ({ route, navigation }) => {
  const { user } = route.params;
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`)
      .then((response) => response.json())
      .then((responseJson) => {
        setLoading(false);
        setData(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <Container>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            onPress={() =>
              navigation.navigate('Post', { user: user, post: item })
            }>
            <Body style={{ justifyContent: 'center' }}>
              <Text style={{ fontWeight: 'bold', padding: '2%', fontSize: 16 }}>
                {item.title}
              </Text>
            </Body>
            <Right>
              <AntDesign name="right" size={16} color="black" />
            </Right>
          </ListItem>
        )}
      />
    </Container>
  );
};

const Post = ({ route, navigation }) => {
  const { user, post } = route.params;
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
      .then((response) => response.json())
      .then((responseJson) => {
        setLoading(false);
        setData(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <Container>
      <Content>
        <Card>
          <CardItem style={{ backgroundColor: '#212121' }}>
            <Thumbnail
              style={{ marginRight: '8%' }}
              medium
              source={{
                uri: 'https://source.unsplash.com/random/' + user.id,
              }}
            />
            <Body>
              <Text
                style={{
                  fontSize: 18,
                  marginTop: '2%',
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                {user.name}
              </Text>
              <Text note style={{ color: '#1DA1F2' }}>
                @{user.username}
              </Text>
            </Body>
          </CardItem>

          <CardItem style={{ backgroundColor: '#262626', marginTop: 1 }}>
            <Body>
              <Text
                style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>
                {post.title}
              </Text>
              <Text style={styles.textStyle}>{post.body}</Text>
            </Body>
          </CardItem>

          <CardItem style={{ backgroundColor: '#262626', marginTop: 2 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'white' }}>
              <MaterialCommunityIcons name="chat" size={22} color="white" />{' '}
              Comments:
            </Text>
          </CardItem>

          {data.map((item) => (
            <CardItem
              style={{ backgroundColor: '#262626', marginTop: 1 }}
              key={item.id}>
              <Body>
                <View style={{ flexDirection: 'row' }}>
                  <Thumbnail
                    small
                    style={{ marginRight: '3%' }}
                    source={{
                      uri: 'https://source.unsplash.com/random/' + item.id + 5,
                    }}
                  />
                  <View
                    style={{
                      paddingRight: '5%',
                      flex: 1,
                      flexDirection: 'column',
                    }}>
                    <Text style={{ fontWeight: 'bold', color: 'white' }}>
                      {item.name}
                    </Text>
                    <Text note style={{ color: '#1DA1F2' }}>
                      {item.email}
                    </Text>
                    <Text style={{ marginTop: '3%', color: 'white' }}>
                      {item.body}
                    </Text>
                  </View>
                </View>
              </Body>
            </CardItem>
          ))}
        </Card>
      </Content>
    </Container>
  );
};

const Todos = ({ route, navigation }) => {
  const { user } = route.params;
  const [data, setData] = React.useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/todos`)
      .then((response) => response.json())
      .then((responseJson) => {
        setLoading(false);
        setData(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <Container>
      <Content>
        <List>
          {data.map((item) => (
            <ListItem key={item.id}>
              <Body style={{ justifyContent: 'center' }}>
                <Text
                  style={{ fontWeight: 'normal', padding: '2%', fontSize: 18 }}>
                  {item.title}
                </Text>
              </Body>
              <Right style={{ justifyContent: 'center' }}>
                {item.completed ? (
                  <Fontisto name="checkbox-active" size={18} color="#006b1d" />
                ) : (
                  <Fontisto name="checkbox-passive" size={18} color="#eb0000" />
                )}
              </Right>
            </ListItem>
          ))}
        </List>
      </Content>
    </Container>
  );
};

function ProfileStackScreen({ route, navigation }) {
  const user = route.params;

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#050307',
        },
      }}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        initialParams={{ user: user.user }}
      />
    </Stack.Navigator>
  );
}

function AlbumsStackScreen({ route, navigation }) {
  const user = route.params;

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#050307',
        },
      }}>
      <Stack.Screen
        name="Albums"
        component={Albums}
        initialParams={{ user: user.user }}
      />
      <Stack.Screen name="Photos" component={Photos} />
      <Stack.Screen name="Picture" component={Picture} />
    </Stack.Navigator>
  );
}

function PostsStackScreen({ route, navigation }) {
  const user = route.params;

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#050307',
        },
      }}>
      <Stack.Screen
        name="Posts"
        component={PostsList}
        initialParams={{ user: user.user }}
      />
      <Stack.Screen name="Post" component={Post} />
    </Stack.Navigator>
  );
}

function TodosStackScreen({ route, navigation }) {
  const user = route.params;

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#050307',
        },
      }}>
      <Stack.Screen
        name="Todos"
        component={Todos}
        initialParams={{ user: user.user }}
      />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function BottomTab({ route, navigation }) {
  const user = route.params;

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#38abf2',
        inactiveTintColor: 'white',
        activeBackgroundColor: '#050307',
        inactiveBackgroundColor: '#050307',
      }}>
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStackScreen}
        initialParams={{ user: user.user }}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AlbumsStack"
        component={AlbumsStackScreen}
        initialParams={{ user: user.user }}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="image" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="PostsStack"
        component={PostsStackScreen}
        initialParams={{ user: user.user }}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="post" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="TodosStack"
        component={TodosStackScreen}
        initialParams={{ user: user.user }}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="format-list-checks"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#050307',
          },
        }}>
        <Stack.Screen name="Users" component={UsersListScreen} />
        <Stack.Screen
          name="Bottom Navigation"
          component={BottomTab}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 16,
    color: '#F5F8FA',
  },
});

export default App;