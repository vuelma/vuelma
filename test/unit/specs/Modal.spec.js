import Vue from 'vue';
import Modal from '@/components/Modal';

function getComponent(propsData, children) {
  const Constructor = Vue.extend(Modal);
  return new Constructor({ propsData, children }).$mount();
}

describe('Modal.vue', () => {
  describe('show prop', () => {
    const vm = getComponent({
      show: true,
    });
    it('should show modal if prop is true', () => {
      expect(vm.$el.style.display).to.be.eql('');
    });

    it('should not show modal if prop is false', (done) => {
      vm.show = false;

      Vue.nextTick(() => {
        expect(vm.$el.style.display).to.eql('none');
        done();
      });
    });
  });

  describe('isCard prop', () => {
    describe('true', () => {
      const vm = new Vue({
        template: `
          <modal is-card :show="true" ref="modal">
            <span slot="title"> Sample Title </span>

            <div slot="body">
              This is a body.
            </div>

            <div slot="foot">
              This is a foot.
            </div>
          </modal>
        `,
        components: {
          Modal,
        },
      }).$mount();

      it('should be able to match classes of a Bulma card component and no .modal-content', () => {
        expect(!!vm.$el.querySelector('.modal > .modal-card')).to.be.true;
        expect(!!vm.$el.querySelector('.modal > .modal-card > .modal-card-body')).to.be.true;
        expect(!!vm.$el.querySelector('.modal > .modal-card > .modal-card-foot')).to.be.true;
        expect(!!vm.$el.querySelector('.modal > .modal-content')).to.not.be.true;
      });
    });

    describe('false', () => {
      const vm = getComponent({
        show: true,
        isCard: false,
      });

      it('should have .modal-content class and no Bulma card classes if prop is false', () => {
        expect(!!vm.$el.querySelector('.modal > .modal-card')).to.not.be.true;
        expect(!!vm.$el.querySelector('.modal > .modal-card > .modal-card-body')).to.not.be.true;
        expect(!!vm.$el.querySelector('.modal > .modal-card > .modal-card-foot')).to.not.be.true;
        expect(!!vm.$el.querySelector('.modal > .modal-content')).to.be.true;
      });
    });
  });

  describe('hasClose prop', () => {
    const vm = getComponent({
      show: true,
      hasClose: true,
    });

    describe('true', () => {
      it('should have a close button', (done) => {
        vm.$nextTick(() => {
          expect(!!vm.$el.querySelector('.modal > button.modal-close')).to.be.true;
          done();
        });
      });
      it('should have a close button on title for modal card', (done) => {
        vm.isCard = true;
        vm.$nextTick(() => {
          expect(!!vm.$el.querySelector('.modal > .modal-card > .modal-card-head > button.delete')).to.be.true;
          done();
        });
      });
    });

    describe('false', () => {
      it('should not have a close button', (done) => {
        vm.hasClose = false;
        vm.$nextTick(() => {
          expect(!!vm.$el.querySelector('.modal > button.modal-close')).to.not.be.true;
          done();
        });
      });
      it('should not have a close button on title for modal card', (done) => {
        vm.isCard = true;
        vm.hasClose = false;
        vm.$nextTick(() => {
          expect(!!vm.$el.querySelector('.modal > .modal-card > .modal-card-head > button.delete')).to.not.be.true;
          done();
        });
      });
    });
  });

  describe('close()', () => {
    it('should emit update:show with false on close()', () => {
      const vm = getComponent({
        show: true,
      });
      const spy = sinon.spy();
      vm.$on('update:show', spy);
      vm.close();

      expect(spy).to.have.been.calledWith(false);
    });
  });
});
