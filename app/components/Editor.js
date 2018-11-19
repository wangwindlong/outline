// @flow
import * as React from 'react';
import RichMarkdownEditor from 'rich-markdown-editor';
import { uploadFile } from 'utils/uploadFile';
import isInternalUrl from 'utils/isInternalUrl';

type Props = {
  titlePlaceholder?: string,
  bodyPlaceholder?: string,
  defaultValue?: string,
  readOnly?: boolean,
  history: *,
  ui: *,
};

class Editor extends React.Component<Props> {
  onUploadImage = async (file: File) => {
    const result = await uploadFile(file);
    return result.url;
  };

  onClickLink = (href: string) => {
    // on page hash
    if (href[0] === '#') {
      window.location.href = href;
      return;
    }

    if (isInternalUrl(href)) {
      // relative
      let navigateTo = href;

      // probably absolute
      if (href[0] !== '/') {
        try {
          const url = new URL(href);
          navigateTo = url.pathname + url.hash;
        } catch (err) {
          navigateTo = href;
        }
      }

      this.props.history.push(navigateTo);
    } else {
      window.open(href, '_blank');
    }
  };

  onShowToast = (message: string) => {
    this.props.ui.showToast(message, 'success');
  };

  render() {
    return (
      <RichMarkdownEditor
        uploadImage={this.onUploadImage}
        onClickLink={this.onClickLink}
        onShowToast={this.onShowToast}
        {...this.props}
      />
    );
  }
}

export default Editor;