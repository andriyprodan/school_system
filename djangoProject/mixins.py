class MultiSerializerViewSetMixin(object):
    def get_serializer_class(self):
        try:
            for ser_klass, actions in self.serializer_action_classes.items():
                if self.action in actions:
                    return ser_klass
        except (KeyError, AttributeError):
            return super(MultiSerializerViewSetMixin, self).get_serializer_class()