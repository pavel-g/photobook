import React from 'react';
import PhotoInPage from './photo-in-page.jsx';
import UserDataStore from './stores/user-data.js';
import UserDataPrototype from './UserDataPrototype.jsx';
import lodash from 'lodash';

class Page extends UserDataPrototype {
	
	getPageIndex() {
		return lodash.get(this.props, 'pageIndex', null);
	}
	
	getPageCfg() {
		return UserDataStore.getPageCfg( this.getPageIndex() );
	}
	
	getLayout() {
		var pageCfg = this.getPageCfg();
		return pageCfg.layout;
	}
	
	getPhotos() {
		return this.getPageCfg().photos;
	}
	
	getTableStyle() {
		var tableStyle = {
			width: '100%',
			border: '1px solid #000000'
		};
		return tableStyle
	}
	
	renderOneAndFour() {
		var tableStyle = this.getTableStyle();
		var pageIndex = this.getPageIndex();
		return (
			<table style={tableStyle}>
				<tbody>
					<tr>
						<PhotoInPage colspan="2" rowspan="2" pageIndex={pageIndex} photoIndex="0">1</PhotoInPage>
						<PhotoInPage pageIndex={pageIndex} photoIndex="1">2</PhotoInPage>
						<PhotoInPage pageIndex={pageIndex} photoIndex="2">3</PhotoInPage>
					</tr>
					<tr>
						<PhotoInPage pageIndex={pageIndex} photoIndex="3">4</PhotoInPage>
						<PhotoInPage pageIndex={pageIndex} photoIndex="4">5</PhotoInPage>
					</tr>
				</tbody>
			</table>
		);
	}
	
	renderFourAndOne() {
		var tableStyle = this.getTableStyle();
		var pageIndex = this.getPageIndex();
		return (
			<table style={tableStyle}>
				<tbody>
					<tr>
						<PhotoInPage pageIndex={pageIndex} photoIndex="0">1</PhotoInPage>
						<PhotoInPage pageIndex={pageIndex} photoIndex="1">2</PhotoInPage>
						<PhotoInPage pageIndex={pageIndex} photoIndex="4" colspan="2" rowspan="2">5</PhotoInPage>
					</tr>
					<tr>
						<PhotoInPage pageIndex={pageIndex} photoIndex="2">3</PhotoInPage>
						<PhotoInPage pageIndex={pageIndex} photoIndex="3">4</PhotoInPage>
					</tr>
				</tbody>
			</table>
		);
	}
	
	renderFourAndFour() {
		var tableStyle = this.getTableStyle();
		var pageIndex = this.getPageIndex();
		return (
			<table style={tableStyle}>
				<tbody>
					<tr>
						<PhotoInPage pageIndex={pageIndex} photoIndex="0">1</PhotoInPage>
						<PhotoInPage pageIndex={pageIndex} photoIndex="1">2</PhotoInPage>
						<PhotoInPage pageIndex={pageIndex} photoIndex="4">5</PhotoInPage>
						<PhotoInPage pageIndex={pageIndex} photoIndex="5">6</PhotoInPage>
					</tr>
					<tr>
						<PhotoInPage pageIndex={pageIndex} photoIndex="2">3</PhotoInPage>
						<PhotoInPage pageIndex={pageIndex} photoIndex="3">4</PhotoInPage>
						<PhotoInPage pageIndex={pageIndex} photoIndex="6">7</PhotoInPage>
						<PhotoInPage pageIndex={pageIndex} photoIndex="7">8</PhotoInPage>
					</tr>
				</tbody>
			</table>
		);
	}
	
	render() {
		var layout = this.getLayout(),
		    res;
		switch(layout) {
			case '1+4':
				res = this.renderOneAndFour();
				break;
			case '4+1':
				res = this.renderFourAndOne();
				break;
			default: // 4+4
				res = this.renderFourAndFour();
		}
		return res;
	}
	
}

export default Page;
