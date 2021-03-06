import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
  ScrollView,
  Platform,
  NativeModules,
} from 'react-native';
import { Cross } from './Cross';
import { MoveLeft, MoveRight } from './Move';

export const GridImageView = ({
  data,
  headers = null,
  renderGridImage = null,
  renderModalImage = null,
  transparent = 0.8,
  heightOfGridImage = Dimensions.get('window').height / 5.5,
}) => {
  const [modal, setModal] = useState({visible: false, data: 0});
  const ref = useRef();
  var key = 0;

  const {StatusBarManager} = NativeModules;
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
  const [height, setHeight] = useState(STATUSBAR_HEIGHT);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight((statusBarHeight) => {
        setHeight(statusBarHeight.height);
      });
    }
  }, []);

  const Component = ({style = {flex: 1}}) => {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        ref={ref}
        style={{...style}}
        snapToInterval={Dimensions.get('window').width}
        decelerationRate="fast"
        horizontal>
        {data.map((item, key) => (
          <View key={key}>
            {renderModalImage !== null ? (
              renderModalImage(item, {
                ...styles.img_modal,
                backgroundColor: `rgba(0, 0, 0, ${transparent})`,
                borderRadius: 20, backgroundColor: 'blue'
              })
            ) : (
              <Image
                style={{
                  ...styles.img_modal,
                  backgroundColor: `rgba(0, 0, 0, ${transparent})`,
                }}
                source={{
                  uri: item,
                  ...(headers == null || headers == undefined || headers == {}
                    ? {}
                    : {method: 'POST', headers}),
                }}
              />
            )}
          </View>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.background}>
      <Modal
        // propagateSwipe={true}
        animationType="slide"
        transparent={false}
        visible={modal.visible}
        onRequestClose={() => {
          setModal({visible: false, data: 0});
        }}
        statusBarTranslucent
      >
        <Component />

        <View style={styles.move_left_view}>
          <TouchableOpacity
            onPress={() => {
              if (modal.data - 1 >= 0) {
                setTimeout(() => {
                  ref.current.scrollTo({
                    x: Dimensions.get('window').width * (modal.data - 1),
                    y: 0,
                    animated: false,
                  });
                }, 1);
                setModal({visible: true, data: modal.data - 1});
              }
            }}>
            <MoveLeft />
          </TouchableOpacity>
        </View>

        <View style={{...styles.cross, top: height + 5}}>
          <TouchableOpacity
            onPress={() => {
              setModal({visible: false, data: 0});
            }}>
            <Cross />
          </TouchableOpacity>
        </View>

        <View style={styles.move_right_view}>
          <TouchableOpacity
            onPress={() => {
              if (modal.data + 1 < data.length) {
                setTimeout(() => {
                  ref.current.scrollTo({
                    x: Dimensions.get('window').width * (modal.data + 1),
                    y: 0,
                    animated: false,
                  });
                }, 1);
                setModal({visible: true, data: modal.data + 1});
              }
            }}>
            <MoveRight />
          </TouchableOpacity>
        </View>
      </Modal>

      <FlatList
        data={data}
        renderItem={({index}) => {
          if (data.length <= index * 3) {
            return null;
          }
          return (
            <View style={styles.unit}>
              <View style={[styles.unit_item, {height: heightOfGridImage}]}>
                {data.length > index * 3 ? (
                  <TouchableOpacity
                    onPress={() => {
                      setModal({visible: true, data: index * 3});

                      setTimeout(() => {
                        ref.current.scrollTo({
                          x: Dimensions.get('window').width * index * 3,
                          y: 0,
                          animated: false,
                        });
                      }, 1);
                    }}
                    style={[styles.unit_item, {height: heightOfGridImage}]}>
                    {renderGridImage !== null ? (
                      renderGridImage(data[index * 3], styles.img)
                    ) : (
                      <Image
                          style={{...styles.img, borderTopLeftRadius: index === 0 ? 20 : 0, borderBottomLeftRadius: index === 1 ? 20 : 0,}}

                          source={{
                          uri: data[index * 3],
                          ...(headers == null ||
                          headers == undefined ||
                          headers == {}
                            ? {}
                            : {method: 'POST', headers}),
                        }}
                      />
                    )}
                  </TouchableOpacity>
                ) : null}
              </View>
              <View style={[styles.unit_item, {height: heightOfGridImage}]}>
                {data.length > index * 3 + 1 ? (
                  <TouchableOpacity
                    onPress={() => {
                      setModal({visible: true, data: index * 3 + 1});

                      setTimeout(() => {
                        ref.current.scrollTo({
                          x: Dimensions.get('window').width * (index * 3 + 1),
                          y: 0,
                          animated: false,
                        });
                      }, 1);
                    }}
                    style={[styles.unit_item, {height: heightOfGridImage}]}>
                    {renderGridImage !== null ? (
                      renderGridImage(data[index * 3 + 1], styles.img)
                    ) : (
                      <Image
                        style={styles.img}
                        source={{
                          uri: data[index * 3 + 1],
                          ...(headers == null ||
                          headers == undefined ||
                          headers == {}
                            ? {}
                            : {method: 'POST', headers}),
                        }}
                      />
                    )}
                  </TouchableOpacity>
                ) : null}
              </View>
              <View style={[styles.unit_item, {height: heightOfGridImage}]}>
                {data.length > index * 3 + 2 ? (
                  <TouchableOpacity
                    onPress={() => {
                      setModal({visible: true, data: index * 3 + 2});

                      setTimeout(() => {
                        ref.current.scrollTo({
                          x: Dimensions.get('window').width * (index * 3 + 2),
                          y: 0,
                          animated: false,
                        });
                      }, 1);
                    }}
                    style={[styles.unit_item, {height: heightOfGridImage}]}>
                    {renderGridImage !== null ? (
                      renderGridImage(data[index * 3 + 2], styles.img)
                    ) : (
                      <Image
                        style={{...styles.img, borderTopRightRadius: index === 0 ? 20 : 0, borderBottomRightRadius: index === 1 ? 20 : 0,}}
                        source={{
                          uri: data[index * 3 + 2],
                          ...(headers == null ||
                          headers == undefined ||
                          headers == {}
                            ? {}
                            : {method: 'POST', headers}),
                        }}
                      />
                    )}
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => {
          key++;
          return key.toString();
        }}
        style={styles.flatlist}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  flatlist: {
    flex: 1,
  },
  unit: {
    flexDirection: 'row',
  },
  unit_item: {
    margin: 1.5,
    flex: 1,
  },
  img: {
    flex: 1,
  },
  img_modal: {
    height: Dimensions.get('window').height + 80,
    width: Dimensions.get('window').width,
    resizeMode: 'contain',
  },
  cross: {
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
  },
  move_left_view: {
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    bottom: 0,
    left: 10,
  },
  move_right_view: {
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    bottom: 0,
    right: 10,
  },
});


