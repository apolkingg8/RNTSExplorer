/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * Typescript rewrite by Bruno Grieder
 */

'use strict'

import React from 'react-native'
import RNTSExample from '../RNTSExample'
import RNTSExampleModule from '../RNTSExampleModule'
import RNTSExplorerPage from '../RNTSExplorerPage'

const {
          Image,
          ListView,
          TouchableHighlight,
          StyleSheet,
          Text,
          View,
          } = React

const THUMB_URLS = [ 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-ash3/t39.1997/p128x128/851549_767334479959628_274486868_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851561_767334496626293_1958532586_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-ash3/t39.1997/p128x128/851579_767334503292959_179092627_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851589_767334513292958_1747022277_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851563_767334559959620_1193692107_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851593_767334566626286_1953955109_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851591_767334523292957_797560749_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851567_767334529959623_843148472_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851548_767334489959627_794462220_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851575_767334539959622_441598241_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-ash3/t39.1997/p128x128/851573_767334549959621_534583464_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851583_767334573292952_1519550680_n.png' ]
const LOREM_IPSUM = 'Lorem ipsum dolor sit amet, ius ad pertinax oportere accommodare, an vix civibus corrumpit referrentur. Te nam case ludus inciderint, te mea facilisi adipiscing. Sea id integre luptatum. In tota sale consequuntur nec. Erat ocurreret mei ei. Eu paulo sapientem vulputate est, vel an accusam intellegam interesset. Nam eu stet pericula reprimique, ea vim illud modus, putant invidunt reprehendunt ne qui.'

/* eslint no-bitwise: 0 */
const hashCode = function ( str: string ) {
    var hash = 15
    for ( var ii = str.length - 1; ii >= 0; ii-- ) {
        hash = ((hash << 5) - hash) + str.charCodeAt( ii )
    }
    return hash
}


const styles = StyleSheet.create(
    {
        row:       {
            flexDirection:   'row',
            justifyContent:  'center',
            padding:         10,
            backgroundColor: '#F6F6F6',
        },
        separator: {
            height:          1,
            backgroundColor: '#CCCCCC',
        },
        thumb:     {
            width:  64,
            height: 64,
        },
        text:      {
            flex: 1,
        },
    }
)

class ListViewSimpleExample extends React.Component<any,any> {

    static get title() { return '<ListView> - Simple' }
    static get description() { return 'Performant, scrollable list of data.' }


    private _pressData: {[key: number]: boolean}

    componentWillMount() {
        this._pressData = {}
        const ds = new ListView.DataSource( { rowHasChanged: ( r1, r2 ) => r1 !== r2 } )
        this.setState(
            {
                dataSource: ds.cloneWithRows( this._genRows( {} ) )
            }
        )
    }

    render() {
        return (

            <RNTSExplorerPage
                title={this.props.navigator ? null : '<ListView> - Simple'}
                noSpacer={true}
                noScroll={true}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                />
            </RNTSExplorerPage>
        )
    }

    private _renderRow = ( rowData: string, sectionID: number, rowID: number ): JSX.Element => {
        var rowHash = Math.abs( hashCode( rowData ) )
        var imgSource = {
            uri: THUMB_URLS[ rowHash % THUMB_URLS.length ],
        }
        return (
            <TouchableHighlight onPress={() => this._pressRow(rowID)}>
                <View>
                    <View style={styles.row}>
                        <Image style={styles.thumb} source={imgSource}/>
                        <Text style={styles.text}>
                            {rowData + ' - ' + LOREM_IPSUM.substr(0, rowHash % 301 + 10)}
                        </Text>
                    </View>
                    <View style={styles.separator}/>
                </View>
            </TouchableHighlight>
        )
    }

    private _genRows = ( pressData: {[key: number]: boolean} ): Array<string> => {
        var dataBlob: any[] = []
        for ( var ii = 0; ii < 100; ii++ ) {
            var pressedText = pressData[ ii ] ? ' (pressed)' : ''
            dataBlob.push( 'Row ' + ii + pressedText )
        }
        return dataBlob
    }

    private _pressRow = ( rowID: number ): void => {
        this._pressData[ rowID ] = !this._pressData[ rowID ]
        this.setState(
            {
                dataSource: this.state.dataSource.cloneWithRows( this._genRows( this._pressData ) )
            }
        )
    }
}


export default ListViewSimpleExample
