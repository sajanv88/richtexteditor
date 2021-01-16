import EditorJs from '@editorjs/editorjs';
import Header from "@editorjs/header";
import Image from '@editorjs/image';
import Paragraph from '@editorjs/paragraph';
import './css/main.scss';


function convertBase64(file: File):Promise<string> {
	return new Promise((resolve, reject) => {
		const fr = new FileReader();
    fr.onload = function () {
			resolve(fr.result as string);
		};
		fr.onerror = function () {
			reject(new Error('failed to convert'))
		}
    fr.readAsDataURL(file);
	})
}

const editorjs = new EditorJs({
  holder: "editorjs",
	placeholder: "Type here...",
	tools: {
		header: Header,
		paragraph: {
			class: Paragraph
		},
		image: {
			class: Image,
			config: {
				uploader: {
					async uploadByFile(file: File) {
						return {
              success: 1,
              file: {
                url: await convertBase64(file)
              },
            };
					}
				}
			}
		}
	}
});


document.querySelector('#saveBtn').addEventListener('click', async () => {
	try {
		const jsonData = await editorjs.save();
		console.log(jsonData);
	}catch(e) {
		console.error(e)
	}
})