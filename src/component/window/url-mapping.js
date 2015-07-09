import React from 'react';

const {func, array} = React.PropTypes;

export default class UrlMappingWindow extends React.Component {

  constructor() {
    super();

    this.state = {
      urlInput: '',
      newUrlInput: '',
      localPath: false
    };
  }

  setUrlValue() {
    this.setState({urlInput: event.target.value});
  }

  setNewUrlValue() {
    this.setState({newUrlInput: event.target.value});
  }

  setNewLocalUrlValue() {
    const {chooseFile} = this.props;

    chooseFile((paths) => {
      if (!paths) return;
      const path = paths[0];

      this.setState({
        newUrlInput: path,
        localPath: true
      });
    });
  }

  saveMapping() {
    const {setUrlMapping} = this.props;
    const {urlInput, newUrlInput, localPath} = this.state;

    this.setState({
      urlInput: '',
      newUrlInput: ''
    });

    setUrlMapping(urlInput, newUrlInput, localPath);
  }

  render() {
    const {urlInput, newUrlInput} = this.state;
    let {urlMappings} = this.props;
    const {removeUrlMapping, closeWindow} = this.props;

    urlMappings = urlMappings.map((map, index) => {
      const removeMapping = () => {
        removeUrlMapping(map.url);
      };

      return <li className="collection-item" key={index}>
        <div>
          <span className="col">
            {map.url}
          </span>
          <span className="seperator">
            <i className="fa fa-chevron-right"></i>
          </span>
          <span className="col">
            {map.newUrl}
          </span>
          <a href="#!" className="secondary-content" onClick={removeMapping}>
            <i className="fa fa-remove"></i>
          </a>
        </div>
      </li>;
    });

    return <div className="window url-mapping-window">
      <a href="#!" onClick={closeWindow} className="close-button">
        <i className="fa fa-remove"></i>
      </a>
      <h4>URL Mappings</h4>
      <ul className="collection with-header">
        <li className="collection-item add-mapping">
          <div>
            <input
              value={urlInput}
              className="col"
              type="text"
              placeholder="Enter the URL to map"
              onChange={this.setUrlValue.bind(this)}
              />
            <span className="seperator">
              <i className="fa fa-chevron-right"></i>
            </span>
            <input
              value={newUrlInput}
              className="col"
              type="text"
              placeholder="Enter the new URL"
              onChange={this.setNewUrlValue.bind(this)}
              />
            <a onClick={this.setNewLocalUrlValue.bind(this)}>Choose file</a>
            <a href="#!" className="secondary-content"
               onClick={this.saveMapping.bind(this)}>
              <i className="fa fa-plus"></i>
            </a>
          </div>
        </li>
        {urlMappings}
      </ul>
    </div>;
  }
}

UrlMappingWindow.propTypes = {
  setUrlMapping: func.isRequired,
  chooseFile: func.isRequired,
  removeUrlMapping: func.isRequired,
  closeWindow: func.isRequired,
  urlMappings: array.isRequired
};
