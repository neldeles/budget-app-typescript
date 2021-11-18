import { Meta, Story } from "@storybook/react";
import { Modal, TModalProps } from ".";
import { Button } from "../Button";
import { XIcon } from "@heroicons/react/solid";

export default {
  title: "Components/Atoms/Modal",
  component: Modal,
  parameters: {
    componentSubtitle: "Primary wrapper for modal UI.",
    docs: {
      description: {
        component:
          "Sample modal with filler text. Click outside the modal to dismiss.",
      },
      source: {
        type: "dynamic",
        excludeDecorators: true,
      },
    },
  },
} as Meta;

const Template: Story<TModalProps> = (args) => (
  <Modal>
    <Modal.OpenButton>
      <Button variant="primary" width="default">
        Open Modal
      </Button>
    </Modal.OpenButton>
    {args.children}
  </Modal>
);

// export const Default = () => (
//   <Modal>
//     <Modal.OpenButton>
//       <Button variant="primary" width="default">
//         Open Modal
//       </Button>
//     </Modal.OpenButton>
//     <Modal.Contents>
//       Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
//       accusantium laudantium a sed, eaque repellat. Maiores dolorum rerum cum,
//       quasi distinctio modi est inventore, porro soluta dolores accusamus
//       aspernatur eum?
//     </Modal.Contents>
//   </Modal>
// );

export const Default = Template.bind({});
Default.args = {
  children: (
    <Modal.ContentBase>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
      accusantium laudantium a sed, eaque repellat. Maiores dolorum rerum cum,
      quasi distinctio modi est inventore, porro soluta dolores accusamus
      aspernatur eum?
    </Modal.ContentBase>
  ),
};

export const WithDismissButton = Template.bind({});
WithDismissButton.args = {
  children: (
    <Modal.Content>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus
      doloremque voluptatibus maxime minus et impedit adipisci suscipit,
      blanditiis id tenetur ipsum voluptatum accusamus assumenda quibusdam
      consequatur ut ipsam quaerat dolorem?
    </Modal.Content>
  ),
};
