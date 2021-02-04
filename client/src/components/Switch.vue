<template>
    <label class="form-check form-switch">
      <input class="form-check-input" type="checkbox" :checked="checked ? true : null" @change="handleSwitch($event)">
      <span class="form-check-label">{{ label }}</span>
    </label>
</template>

<script>
export default {
    name: 'Switch',
    props: {
        label: String,
        checked: Boolean,
        onChange: Function
    },
    methods: {
        handleSwitch (event) {
            const { target: { checked }} = event;
            this.onChange && this.onChange({ event: event, checked: checked})
        }
    }
}
</script>